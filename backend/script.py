import json

def read_json_file():
    """
    Reads a JSON file and returns its content as a dictionary.
    Returns:
        dict: The content of the JSON file.
    """
    try:
        with open("data.json", 'r', encoding='utf-8') as file:
            data = json.load(file)
        return data
    except FileNotFoundError:
        print("Error while reading JSON file: File not found.")
    except json.JSONDecodeError:
        print("Error while reading JSON file: Invalid JSON format.")


def write_json_file(json_object):
    """
    Writes a dictionary to a JSON file.
    Args:
        json_object (dict): The dictionary to write to the JSON file.
    """
    try:
        data = read_json_file()
        data.append(json_object)
        with open("data.json", 'w', encoding='utf-8') as file:
            json.dump(data, file, indent=4, ensure_ascii=False)
    except FileNotFoundError:
        print("Error while writing to JSON file: File not found.")
    except json.JSONDecodeError:
        print("Error while writing to JSON file: Invalid JSON format.")

def count_status():
    """
    Counts the occurrences of each status in the JSON file.
    Returns:
        dict: A dictionary with statuses as keys and their counts as values.
    """
    status_count = {}
    data = read_json_file()
    if data:
        for item in data:
            status = item.get("status")
            if status:
                if status in status_count:
                    status_count[status] += 1
                else:
                    status_count[status] = 1
    return status_count

print(read_json_file())
print(count_status())

newObject = {
    "id": 3,
    "title": "Ajouter un filtre par priorité",
    "description": "Permettre de filtrer les tickets par priorité (Low, Medium, High) sur la page liste.",
    "priority": "Medium",
    "status": "In progress",
    "tags": ["feature", "ux"],
    "createdAt": "2026-01-15"
  }

write_json_file(newObject)