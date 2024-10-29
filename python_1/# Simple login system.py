# Initialize an empty dictionary to store user credentials
users = {}

def welcome_message():
    print("Welcome to Passion 4 Fashion!")

def get_input(prompt):
    """Function to handle user input and avoid repetition."""
    return input(prompt).strip()

def create_account():
    while True:
        username = get_input("Create a username: ")
        if username in users:
            print("Username already exists. Please choose a different username.")
        else:
            break
    
    while True:
        password = get_input("Create a password: ")
        verify_password = get_input("Verify your password: ")
        
        if password == verify_password:
            users[username] = password
            print("Account created successfully!")
            return username
        else:
            print("Passwords do not match. Please try again.")

def login():
    while True:
        username = get_input("Enter your username: ")
        password = get_input("Enter your password: ")
        
        if users.get(username) == password:
            print("Login successful!")
            return username
        else:
            print("Incorrect username or password. Please try again.")

def display_options(items):
    for index, item in enumerate(items):
        print(f"{index + 1}. {item}")

def choose_item(category, items):
    print(f"\nSelect a {category}:")
    display_options(items)
    
    while True:
        choice = get_input(f"Enter the number of your choice (1-{len(items)}): ")
        if choice.isdigit() and 1 <= int(choice) <= len(items):
            return items[int(choice) - 1]
        else:
            print("Invalid choice. Please try again.")

def outfit_picker():
    clothing = {
        'Top': ['Red Tank Top', 'Pink Top', 'Black Top', 'Blue Top'],
        'Bottom': ['Jeans', 'Skirt', 'Shorts', 'Sweats'],
        'Shoes': ['Sneakers', 'Heels', 'Flats', 'Boots'],
        'Accessory': ['Necklace', 'Glasses', 'Belt', 'Bracelet']
    }

    selected_outfit = {category: choose_item(category, items) for category, items in clothing.items()}

    # Display the selected outfit
    print("\nYour selected outfit:")
    for category, item in selected_outfit.items():
        print(f"{category}: {item}")

    finished_screen(selected_outfit)

def finished_screen(selected_outfit):
    print("\n=== Outfit Complete! ===")
    print("Your character is all dressed up with the following:")
    for category, item in selected_outfit.items():
        print(f"👕 {category}: {item}")
    print("\nThanks for using Passion 4 Fashion! You look gorge!")

def start_screen(username):
    print(f"\nWelcome back, {username}! You are now in the Outfit Picker.")
    get_input("Press Enter to continue to the Outfit Picker...")

def main():
    welcome_message()
    
    has_account = get_input("Do you already have an account? (yes/no): ")
    
    if has_account == "yes":
        username = login()  # User logs in
    elif has_account == "no":
        username = create_account()  # User creates a new account
    else:
        print("Invalid input. Please restart the program and enter 'yes' or 'no'.")
        return
    
    start_screen(username)  # Show start screen with the logged-in username
    outfit_picker()  # Directly proceed to outfit picking

# Start the program
if __name__ == "__main__":
    main()
