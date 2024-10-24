# Simple login systemnno

# Initialize an empty dictionary to store user credentials
users = {}

def welcome_message():
    print("Welcome to Passion 4 Fashion!")

def create_account():
    while True:
        username = input("Create a username: ")
        if username in users:
            print("Username already exists. Please choose a different username.")
        else:
            break
    
    while True:
        password = input("Create a password: ")
        
        verify_password = input("Verify your password: ")
        
        if password == verify_password:
            users[username] = password
            print("Account created successfully!")
            return username
        else:
            print("Passwords do not match. Please try again.")

def login():
    while True:
        username = input("Enter your username: ")
        password = input("Enter your password: ")
        
        if username in users and users[username] == password:
            print("Login successful!")
            return username
        else:
            print("Incorrect username or password. Please try again.")

def outfit_picker():
    # Define clothing items
    tops = ['Red Tank Top', 'Pink Top', 'Black Top', 'Blue Top']
    bottoms = ['Jeans', 'Skirt', 'Shorts', 'Sweats']
    shoes = ['Sneakers', 'Heels', 'Flats', 'Boots']
    accessories = ['Necklace', 'Glasses', 'Belt', 'Necklace']

    def display_options(items):
        for index, item in enumerate(items):
            print(f"{index + 1}. {item}")

    def choose_item(category, items):
        print(f"\nSelect a {category}:")
        display_options(items)
        
        while True:
            choice = input(f"Enter the number of your choice (1-{len(items)}): ")
            if choice.isdigit() and 1 <= int(choice) <= len(items):
                return items[int(choice) - 1]
            else:
                print("Invalid choice. Please try again.")

    # Allow user to select items
    selected_top = choose_item('Top', tops)
    selected_bottom = choose_item('Bottom', bottoms)
    selected_shoes = choose_item('Shoes', shoes)
    selected_accessory = choose_item('Accessory', accessories)

    # Display the selected outfit
    print("\nYour selected outfit:")
    print(f"Top: {selected_top}")
    print(f"Bottom: {selected_bottom}")
    print(f"Shoes: {selected_shoes}")
    print(f"Accessory: {selected_accessory}")

    # Transition to the finished screen
    finished_screen(selected_top, selected_bottom, selected_shoes, selected_accessory)

def finished_screen(top, bottom, shoes, accessory):
    print("\n=== Outfit Complete! ===")
    print("Your character is all dressed up with the following:")
    print(f"👕 Top: {top}")
    print(f"👖 Bottom: {bottom}")
    print(f"👟 Shoes: {shoes}")
    print(f"🧢 Accessory: {accessory}")
    print("\nThanks for using Passion 4 Fashion! You look Gorge!")

def start_screen(username):
    print(f"\nWelcome back, {username}! You are now in the Outfit Picker.")
    input("Press Enter to continue to the Outfit Picker...")

def main():
    welcome_message()
    
    has_account = input("Do you already have an account? (yes/no): ").strip().lower()
    
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
