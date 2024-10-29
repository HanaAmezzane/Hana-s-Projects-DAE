import tkinter as tk
from tkinter import messagebox
import random

# Initialize an empty dictionary to store user credentials
users = {}

def welcome_message():
    messagebox.showinfo("Welcome", "Welcome to Passion 4 Fashion!")

def create_account():
    username = username_entry.get()
    password = password_entry.get()
    verify_password = verify_password_entry.get()

    if username in users:
        messagebox.showerror("Error", "Username already exists. Please choose a different username.")
    elif password != verify_password:
        messagebox.showerror("Error", "Passwords do not match. Please try again.")
    else:
        users[username] = password
        messagebox.showinfo("Success", "Account created successfully!")
        login_screen()

def login():
    username = username_entry.get()
    password = password_entry.get()

    if username in users and users[username] == password:
        messagebox.showinfo("Success", "Login successful!")
        outfit_picker()
    else:
        messagebox.showerror("Error", "Incorrect username or password. Please try again.")

def outfit_picker():
    tops = ['Red Tank Top', 'Pink Top', 'Black Top', 'Blue Top']
    bottoms = ['Jeans', 'Skirt', 'Shorts', 'Sweats']
    shoes = ['Sneakers', 'Heels', 'Flats', 'Boots']
    accessories = ['Necklace', 'Glasses', 'Belt', 'Bracelet']

    selected_top = random.choice(tops)
    selected_bottom = random.choice(bottoms)
    selected_shoes = random.choice(shoes)
    selected_accessory = random.choice(accessories)

    outfit_details = (
        f"👕 Top: {selected_top}\n"
        f"👖 Bottom: {selected_bottom}\n"
        f"👟 Shoes: {selected_shoes}\n"
        f"🧢 Accessory: {selected_accessory}"
    )
    messagebox.showinfo("Your Outfit", outfit_details)

def show_login():
    global username_entry, password_entry, verify_password_entry
    username_label.grid(row=0, column=0)
    username_entry.grid(row=0, column=1)
    password_label.grid(row=1, column=0)
    password_entry.grid(row=1, column=1)
    verify_password_label.grid(row=2, column=0)
    verify_password_entry.grid(row=2, column=1)

    create_button.grid(row=3, column=0)
    login_button.grid(row=3, column=1)

def login_screen():
    clear_frame()
    show_login()

def clear_frame():
    for widget in frame.winfo_children():
        widget.grid_forget()

# GUI Setup
root = tk.Tk()
root.title("Passion 4 Fashion")

frame = tk.Frame(root)
frame.pack(padx=10, pady=10)

username_label = tk.Label(frame, text="Username:")
username_entry = tk.Entry(frame)

password_label = tk.Label(frame, text="Password:")
password_entry = tk.Entry(frame, show="*")

verify_password_label = tk.Label(frame, text="Verify Password:")
verify_password_entry = tk.Entry(frame, show="*")

create_button = tk.Button(frame, text="Create Account", command=create_account)
login_button = tk.Button(frame, text="Login", command=login)

welcome_message()
login_screen()

root.mainloop()
