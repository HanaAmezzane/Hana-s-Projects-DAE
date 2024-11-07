# Initialize an empty dictionary to store user credentials (key: username, value: password)
users = {}

def welcome_message():
    """Displays the welcome message to the user."""
    # Print a welcome message to greet the user when they start the program
    print("Welcome to Passion 4 Fashion!")

def get_input(prompt):
    """Function to handle user input and avoid repetition.
    
    Args:
        prompt (str): The message shown to the user when asking for input.

    Returns:
        str: The input entered by the user, stripped of leading/trailing whitespace.
    """
    # Return the user input after stripping out leading/trailing spaces
    return input(prompt).strip()

def create_account():
    """Handles the account creation process.
    
    Asks the user for a username and password, verifying the password matches.
    If the username is taken, prompts the user to choose a different one.
    Returns:
        str: The username of the newly created account.
    """
    while True:
        # Ask the user to create a unique username
        username = get_input("Create a username: ")
        
        # Check if the username already exists in the 'users' dictionary
        if username in users:
            # If the username exists, inform the user and ask for a new one
            print("Username already exists. Please choose a different username.")
        else:
            # If the username is unique, break out of the loop to continue to password creation
            break
    
    while True:
        # Ask the user to create a password
        password = get_input("Create a password: ")
        # Ask the user to re-enter the password to verify it's correct
        verify_password = get_input("Verify your password: ")
        
        # If both password inputs match, store the username and password in the 'users' dictionary
        if password == verify_password:
            users[username] = password  # Store the username and password pair
            print("Account created successfully!")  # Inform the user that the account is created
            return username  # Return the new username to be used for login
        else:
            # If the passwords do not match, inform the user and ask them to try again
            print("Passwords do not match. Please try again.")

def login():
    """Handles the login process by asking the user for their credentials.
    
    Continuously prompts the user until the correct username and password are entered.
    
    Returns:
        str: The username of the successfully logged-in user.
    """
    while True:
        # Prompt the user to enter their username
        username = get_input("Enter your username: ")
        # Prompt the user to enter their password
        password = get_input("Enter your password: ")
        
        # Check if the entered username exists and the password matches the stored one
        if users.get(username) == password:
            print("Login successful!")  # If successful, inform the user
            return username  # Return the username so the user can proceed
        else:
            # If either the username or password is incorrect, ask them to try again
            print("Incorrect username or password. Please try again.")

def display_options(items):
    """Displays a list of items with numbered options.
    
    Args:
        items (list): A list of items to display as options.
    """
    # Loop through each item and display it with a numbered option
    for index, item in enumerate(items):
        print(f"{index + 1}. {item}")  # Display item number and item name

def choose_item(category, items):
    """Prompts the user to choose an item from a list of options.
    
    Args:
        category (str): The name of the category the user is choosing from (e.g., "Top", "Shoes").
        items (list): A list of items the user can choose from.
    
    Returns:
        str: The item selected by the user.
    """
    # Inform the user of the category they're selecting from (e.g., "Top", "Shoes")
    print(f"\nSelect a {category}:")
    # Call the display_options function to show the available options
    display_options(items)
    
    while True:
        # Ask the user to select an option by entering a number
        choice = get_input(f"Enter the number of your choice (1-{len(items)}): ")
        
        # Validate the input to ensure it's a valid choice (within the range of items)
        if choice.isdigit() and 1 <= int(choice) <= len(items):
            # Return the item based on the user's selection
            return items[int(choice) - 1]
        else:
            # If the input is invalid, prompt the user to try again
            print("Invalid choice. Please try again.")

def outfit_picker():
    """Handles the process of selecting an outfit from various categories (top, bottom, shoes, accessory).
    
    The user selects one item from each category, and the selected outfit is displayed.
    Then, the finished screen is called to show the complete outfit.
    """
    # Dictionary of clothing categories with their available items
    clothing = {
        'Top': ['Red Tank Top', 'Pink Top', 'Black Top', 'Blue Top'],
        'Bottom': ['Jeans', 'Skirt', 'Shorts', 'Sweats'],
        'Shoes': ['Sneakers', 'Heels', 'Flats', 'Boots'],
        'Accessory': ['Necklace', 'Glasses', 'Belt', 'Bracelet']
    }

    # Create a dictionary with the selected outfit items by calling choose_item for each category
    selected_outfit = {category: choose_item(category, items) for category, items in clothing.items()}

    # Display the selected outfit to the user
    print("\nYour selected outfit:")
    for category, item in selected_outfit.items():
        print(f"{category}: {item}")  # Show each selected item in the corresponding category

    # Call finished_screen to show the complete outfit on the screen
    finished_screen(selected_outfit)

def finished_screen(selected_outfit):
    """Displays the final outfit selection and a thank you message.
    
    Args:
        selected_outfit (dict): A dictionary containing the selected outfit items (top, bottom, shoes, accessory).
    """
    # Show the completed outfit to the user with a thank you message
    print("\n=== Outfit Complete! ===")
    print("Your character is all dressed up with the following:")
    # Loop through the selected outfit and display the items
    for category, item in selected_outfit.items():
        print(f"👕 {category}: {item}")
    # Display a final message thanking the user
    print("\nThanks for using Passion 4 Fashion! You look gorge!")

def start_screen(username):
    """Displays the start screen with a personalized welcome message.
    
    Args:
        username (str): The logged-in user's username.
    """
    # Greet the user with their username and inform them they are in the Outfit Picker
    print(f"\nWelcome back, {username}! You are now in the Outfit Picker.")
    # Wait for the user to press Enter to continue
    get_input("Press Enter to continue to the Outfit Picker...")

def main():
    """Main function to start the program and guide the user through account creation or login,
    and outfit selection.
    """
    # Display the initial welcome message to the user
    welcome_message()
    
    # Ask the user if they already have an account
    has_account = get_input("Do you already have an account? (yes/no): ")
    
    if has_account == "yes":
        # If the user has an account, call the login function
        username = login()  
    elif has_account == "no":
        # If the user doesn't have an account, call the create_account function
        username = create_account()  
    else:
        # If the input is invalid, notify the user and end the program
        print("Invalid input. Please restart the program and enter 'yes' or 'no'.")
        return
    
    # Show the start screen with the user's username
    start_screen(username)
    # Proceed to outfit selection
    outfit_picker()

# Start the program
if __name__ == "__main__":
    main()
