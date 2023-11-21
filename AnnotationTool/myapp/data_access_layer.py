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
        conn.close()
    except AttributeError:
        pass


def create_db():
    conn, cursor = connect_to_db()

    if conn and cursor:
        try:
            create_table_sql = '''
            CREATE TABLE IF NOT EXISTS image_tags (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                image BLOB,
                x1_coordinate FLOAT,
                y1_coordinate FLOAT,
                x2_coordinate FLOAT,
                y2_coordinate FLOAT
            );
            '''
            cursor.execute(create_table_sql)
        except sqlite3.Error as e:
            print(f"SQLite error: {e}")
        finally:
            close_connection(conn)


def save_image_tagger(image_file, x1_coordinate, y1_coordinate, x2_coordinate, y2_coordinate):
    conn, cursor = connect_to_db()

    if conn and cursor:
        try:
            image_data = image_file.read()
            insert_data_sql = '''
            INSERT INTO image_tags (image, x1_coordinate, y1_coordinate, x2_coordinate, y2_coordinate)
            VALUES (?, ?, ?, ?, ?);
            '''
            cursor.execute(insert_data_sql, (image_data, x1_coordinate, y1_coordinate, x2_coordinate, y2_coordinate))
        except sqlite3.Error as e:
            print(f"SQLite error: {e}")
        finally:
            conn.commit()
            close_connection(conn)

