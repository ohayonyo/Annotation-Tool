import sqlite3


def connect_to_db():
    try:
        conn = sqlite3.connect('tagger_db.db')
        cursor = conn.cursor()
        return conn, cursor
    except sqlite3.Error as e:
        print(f"SQLite error: {e}")
        return None, None


def close_connection(conn):
    try:
        conn.commit()
        conn.close()
    except AttributeError:
        pass


def create_db():
    conn, cursor = connect_to_db()

    if conn and cursor:
        try:
            create_users_table = '''
            CREATE TABLE IF NOT EXISTS users_tb (
                username TEXT PRIMARY KEY,
                password TEXT,
                is_active INTEGER DEFAULT 0
            );
            '''

            create_images_table = '''
                CREATE TABLE IF NOT EXISTS images_tb (
                    username TEXT,
                    image_index INTEGER PRIMARY KEY AUTOINCREMENT,
                    image BLOB,
                    FOREIGN KEY (username) REFERENCES users_tb(username)
                );
            '''

            create_tags_table = '''
            CREATE TABLE IF NOT EXISTS image_tags_tb (
                image_index INTEGER,
                list_element_id INTEGER,
                tag_name TEXT,
                x1_coordinate FLOAT,
                y1_coordinate FLOAT,
                x2_coordinate FLOAT,
                y2_coordinate FLOAT,
                PRIMARY KEY (image_index, list_element_id),
                FOREIGN KEY (image_index) REFERENCES images_tb(image_index)
            );
            '''

            cursor.execute(create_users_table)
            cursor.execute(create_images_table)
            cursor.execute(create_tags_table)

        except sqlite3.Error as e:
            print('Error creating tables')
            print(f"SQLite error: {e}")
        finally:
            close_connection(conn)


def save_image_tags(image, tag_name, coordinates):
    conn, cursor = connect_to_db()

    if conn and cursor:
        try:
            image_data = image.read()
            cursor.execute("INSERT INTO images_tb (image) VALUES (?)", (image_data,))
            image_index = cursor.lastrowid

            list_element_id = 1
            for coord in coordinates:
                x1, y1, x2, y2 = coord
                cursor.execute("""
                    INSERT INTO image_tags_tb (index, list_element_id, tag_name, x1_coordinate, y1_coordinate, x2_coordinate, y2_coordinate)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                """, (image_index, list_element_id, tag_name, x1, y1, x2, y2))
                list_element_id += 1

        except sqlite3.Error as e:
            print(f"SQLite error: {e}")
        finally:
            conn.commit()
            close_connection(conn)


def save_image(username, image_file):
    conn, cursor = connect_to_db()

    if conn and cursor:
        try:
            image_data = image_file.read()
            cursor.execute("""
                INSERT INTO images_tb (username, image) VALUES (?, ?)
            """, (username, image_data))
            image_index = cursor.lastrowid
            return image_index
        except sqlite3.Error as e:
            print(f"SQLite error: {e}")
        finally:
            conn.commit()
            close_connection(conn)


def save_image_tag(tag_with_coordinates, image_index_row_db, list_element_id):
    conn, cursor = connect_to_db()
    if conn and cursor:
        try:
            tag = tag_with_coordinates['tag']
            coordinates = tag_with_coordinates['coordinates']
            x1, y1, x2, y2 = coordinates
            cursor.execute("""
                INSERT INTO image_tags_tb (image_index, list_element_id, tag_name, x1_coordinate, y1_coordinate, x2_coordinate, y2_coordinate)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            """, (image_index_row_db, list_element_id, tag, x1, y1, x2, y2))
        except sqlite3.Error as e:
            print(f"SQLite error: {e}")
        finally:
            conn.commit()
            close_connection(conn)


def is_username_exists(username):
    conn, cursor = connect_to_db()
    if conn and cursor:
        try:
            cursor.execute("""
                SELECT CASE WHEN EXISTS (SELECT 1 FROM users_tb WHERE username = ?) 
                THEN 1 ELSE 0 END AS username_exists;
            """, (username,))
            result = cursor.fetchone()
            return result[0]
        except sqlite3.Error as e:
            print(f"SQLite error: {e}")
        finally:
            conn.commit()
            close_connection(conn)


def save_new_user(username, password):
    conn, cursor = connect_to_db()
    if conn and cursor:
        try:
            cursor.execute("""
                INSERT INTO users_tb (username, password) VALUES (?, ?)
            """, (username, password))
            conn.commit()
            return True
        except sqlite3.Error as e:
            print(f"SQLite error: {e}")
            return False
        finally:
            close_connection(conn)
    return False


def login(username, password):
    conn, cursor = connect_to_db()
    if conn and cursor:
        try:
            cursor.execute("""
                SELECT * FROM users_tb WHERE username = ? AND password = ?
            """, (username, password))
            user = cursor.fetchone()

            if user:
                cursor.execute("""
                    UPDATE users_tb SET is_active = 1 WHERE username = ?
                """, (username,))

                conn.commit()
                return True
            else:
                return False
        except sqlite3.Error as e:
            print(f"SQLite error: {e}")
            return False
        finally:
            close_connection(conn)
    return False
