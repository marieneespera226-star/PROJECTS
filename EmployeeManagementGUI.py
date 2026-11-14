import tkinter as tk
from tkinter import ttk, messagebox, simpledialog
import json
import os

class EmployeeManagementGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("Employee Management System")
        self.root.geometry("650x500")

        self.data_file = "employees.json"
        self.employees = self.load_data()

        # === Treeview (Table) ===
        frame = tk.Frame(root)
        frame.pack(pady=10, padx=10, fill=tk.BOTH, expand=True)

        self.tree = ttk.Treeview(
            frame,
            columns=('ID', 'Name', 'Position', 'Department'),
            show='headings'
        )

        # Column headings
        for col in ('ID', 'Name', 'Position', 'Department'):
            self.tree.heading(col, text=col)
            self.tree.column(col, width=120)

        # Scrollbar
        scrollbar = ttk.Scrollbar(frame, orient="vertical", command=self.tree.yview)
        self.tree.configure(yscrollcommand=scrollbar.set)

        self.tree.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)

        # === Entry fields ===
        self.id_entry = self.create_labeled_entry("ID:")
        self.name_entry = self.create_labeled_entry("Name:")
        self.position_entry = self.create_labeled_entry("Position:")
        self.department_entry = self.create_labeled_entry("Department:")

        # === Buttons ===
        btn_frame = tk.Frame(root)
        btn_frame.pack(pady=10)

        tk.Button(btn_frame, text="Add Employee", width=15, command=self.add_employee).grid(row=0, column=0, padx=5)
        tk.Button(btn_frame, text="Delete Employee", width=15, command=self.delete_employee).grid(row=0, column=1, padx=5)
        tk.Button(btn_frame, text="Search Employee", width=15, command=self.search_employee).grid(row=0, column=2, padx=5)
        tk.Button(btn_frame, text="Refresh", width=15, command=self.refresh_data).grid(row=0, column=3, padx=5)

        self.refresh_data()

    # Utility: labeled entry creator
    def create_labeled_entry(self, label_text):
        frame = tk.Frame(self.root)
        frame.pack()
        label = tk.Label(frame, text=label_text, width=12, anchor="w")
        entry = tk.Entry(frame)
        label.pack(side=tk.LEFT)
        entry.pack(side=tk.LEFT, padx=5)
        return entry

    # === DATA LOADING / SAVING ===

    def load_data(self):
        if os.path.exists(self.data_file):
            try:
                with open(self.data_file, "r") as f:
                    return json.load(f)
            except:
                return []
        return []

    def save_data(self):
        with open(self.data_file, "w") as f:
            json.dump(self.employees, f, indent=4)

    # === BUTTON FUNCTIONS ===

    def add_employee(self):
        employee_id = self.id_entry.get().strip()
        name = self.name_entry.get().strip()
        position = self.position_entry.get().strip()
        department = self.department_entry.get().strip()

        # Validation
        if not all([employee_id, name, position, department]):
            messagebox.showerror("Error", "All fields are required.")
            return

        # Prevent duplicate IDs
        if any(emp["ID"] == employee_id for emp in self.employees):
            messagebox.showerror("Error", "Employee ID already exists.")
            return

        # Add employee
        self.employees.append({
            "ID": employee_id,
            "Name": name,
            "Position": position,
            "Department": department
        })

        self.save_data()
        self.refresh_data()

        # Clear entry fields
        self.id_entry.delete(0, tk.END)
        self.name_entry.delete(0, tk.END)
        self.position_entry.delete(0, tk.END)
        self.department_entry.delete(0, tk.END)

    def delete_employee(self):
        selected_item = self.tree.selection()

        if not selected_item:
            messagebox.showerror("Error", "Select an employee to delete.")
            return

        values = self.tree.item(selected_item, "values")
        employee_id = values[0]

        # Confirmation
        if not messagebox.askyesno("Confirm Delete", f"Delete employee ID {employee_id}?"):
            return

        # Remove employee
        self.employees = [emp for emp in self.employees if emp['ID'] != employee_id]

        self.save_data()
        self.refresh_data()

    def search_employee(self):
        search_query = simpledialog.askstring("Search", "Enter employee Name or ID:")

        if not search_query:
            return

        search_query = search_query.lower().strip()
        results = [
            emp for emp in self.employees
            if search_query in emp['Name'].lower() or search_query == emp['ID'].lower()
        ]

        if not results:
            messagebox.showinfo("No Results", "No matching employees found.")

        self.refresh_data(results)

    def refresh_data(self, data=None):
        # Clear table
        for item in self.tree.get_children():
            self.tree.delete(item)

        data_to_display = data if data is not None else self.employees

        # Populate table
        for emp in data_to_display:
            self.tree.insert('', tk.END, values=(
                emp['ID'], emp['Name'], emp['Position'], emp['Department']
            ))


# === MAIN ===
if __name__ == "__main__":
    root = tk.Tk()
    gui = EmployeeManagementGUI(root)
    root.mainloop()
