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
            create_images_table = '''
            CREATE TABLE IF NOT EXISTS images_tb (
                image_index INTEGER PRIMARY KEY AUTOINCREMENT,
                image BLOB
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


def save_image(image_file):
    conn, cursor = connect_to_db()

    if conn and cursor:
        try:
            image_data = image_file.read()
            cursor.execute("INSERT INTO images_tb (image) VALUES (?)", (image_data,))
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
