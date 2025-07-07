/**
 * Employee Management Dashboard - Enterprise Edition
 * Advanced SPA with comprehensive features and professional code quality
 */

class EmployeeManagementSystem {
  constructor() {
    // Core application state
    this.employees = []
    this.filteredEmployees = []
    this.selectedEmployees = new Set()
    this.currentPage = 1
    this.itemsPerPage = 10
    this.sortField = "name"
    this.sortDirection = "asc"
    this.editingEmployee = null

    // Filter state
    this.filters = {
      search: "",
      department: "",
      status: "",
      minSalary: "",
      maxSalary: "",
    }

    // UI state
    this.sidebarOpen = false
    this.isLoading = false

    // Performance optimization
    this.debounceTimers = new Map()

    // Initialize application
    this.init()
  }

  /**
   * Initialize the application
   */
  async init() {
    try {
      this.showLoading()
      await this.loadEmployeeData()
      this.setupEventListeners()
      this.setupKeyboardShortcuts()
      this.applyFiltersAndSort()
      this.updateStatistics()
      this.renderEmployeeTable()
      this.renderPagination()
      this.hideLoading()
      this.showToast("Dashboard loaded successfully!", "success")
    } catch (error) {
      this.hideLoading()
      this.handleError("Failed to initialize dashboard", error)
    }
  }

  /**
   * Load employee data (simulated API call)
   */
  async loadEmployeeData() {
    // Simulate network delay
    await this.delay(800)

    this.employees = [
      {
        id: 1,
        name: "John Smith",
        email: "john.smith@company.com",
        position: "Senior Software Engineer",
        department: "Engineering",
        salary: 95000,
        status: "Active",
        phone: "+1 (555) 123-4567",
        joinDate: "2022-01-15",
      },
      {
        id: 2,
        name: "Sarah Johnson",
        email: "sarah.johnson@company.com",
        position: "Marketing Manager",
        department: "Marketing",
        salary: 75000,
        status: "Active",
        phone: "+1 (555) 234-5678",
        joinDate: "2021-08-20",
      },
      {
        id: 3,
        name: "Michael Brown",
        email: "michael.brown@company.com",
        position: "Sales Representative",
        department: "Sales",
        salary: 55000,
        status: "Active",
        phone: "+1 (555) 345-6789",
        joinDate: "2023-03-10",
      },
      {
        id: 4,
        name: "Emily Davis",
        email: "emily.davis@company.com",
        position: "HR Specialist",
        department: "HR",
        salary: 60000,
        status: "Active",
        phone: "+1 (555) 456-7890",
        joinDate: "2022-11-05",
      },
      {
        id: 5,
        name: "David Wilson",
        email: "david.wilson@company.com",
        position: "Financial Analyst",
        department: "Finance",
        salary: 70000,
        status: "Inactive",
        phone: "+1 (555) 567-8901",
        joinDate: "2021-06-12",
      },
      {
        id: 6,
        name: "Lisa Anderson",
        email: "lisa.anderson@company.com",
        position: "UX Designer",
        department: "Engineering",
        salary: 80000,
        status: "Active",
        phone: "+1 (555) 678-9012",
        joinDate: "2022-09-18",
      },
      {
        id: 7,
        name: "Robert Taylor",
        email: "robert.taylor@company.com",
        position: "Sales Manager",
        department: "Sales",
        salary: 85000,
        status: "Active",
        phone: "+1 (555) 789-0123",
        joinDate: "2020-12-03",
      },
      {
        id: 8,
        name: "Jennifer Martinez",
        email: "jennifer.martinez@company.com",
        position: "Content Marketing Specialist",
        department: "Marketing",
        salary: 58000,
        status: "Active",
        phone: "+1 (555) 890-1234",
        joinDate: "2023-01-25",
      },
      {
        id: 9,
        name: "Christopher Lee",
        email: "christopher.lee@company.com",
        position: "DevOps Engineer",
        department: "Engineering",
        salary: 90000,
        status: "Active",
        phone: "+1 (555) 901-2345",
        joinDate: "2021-10-14",
      },
      {
        id: 10,
        name: "Amanda White",
        email: "amanda.white@company.com",
        position: "Accountant",
        department: "Finance",
        salary: 65000,
        status: "Active",
        phone: "+1 (555) 012-3456",
        joinDate: "2022-04-08",
      },
      {
        id: 11,
        name: "James Garcia",
        email: "james.garcia@company.com",
        position: "Product Manager",
        department: "Engineering",
        salary: 105000,
        status: "Active",
        phone: "+1 (555) 123-4567",
        joinDate: "2021-02-28",
      },
      {
        id: 12,
        name: "Michelle Rodriguez",
        email: "michelle.rodriguez@company.com",
        position: "HR Manager",
        department: "HR",
        salary: 78000,
        status: "Active",
        phone: "+1 (555) 234-5678",
        joinDate: "2020-07-15",
      },
      {
        id: 13,
        name: "Kevin Johnson",
        email: "kevin.johnson@company.com",
        position: "Software Developer",
        department: "Engineering",
        salary: 72000,
        status: "Active",
        phone: "+1 (555) 345-6789",
        joinDate: "2023-01-10",
      },
      {
        id: 14,
        name: "Rachel Green",
        email: "rachel.green@company.com",
        position: "Marketing Coordinator",
        department: "Marketing",
        salary: 48000,
        status: "Inactive",
        phone: "+1 (555) 456-7890",
        joinDate: "2022-06-15",
      },
      {
        id: 15,
        name: "Thomas Anderson",
        email: "thomas.anderson@company.com",
        position: "Senior Sales Rep",
        department: "Sales",
        salary: 68000,
        status: "Active",
        phone: "+1 (555) 567-8901",
        joinDate: "2021-09-20",
      },
    ]
  }

  /**
   * Setup all event listeners with proper delegation
   */
  setupEventListeners() {
    // Header actions
    this.bindEvent("addEmployeeBtn", "click", () => this.openEmployeeModal())
    this.bindEvent("exportBtn", "click", () => this.exportToCSV())
    this.bindEvent("sidebarToggle", "click", () => this.toggleSidebar())

    // Search and filters with debouncing
    this.bindEvent("searchInput", "input", (e) => {
      this.debounce(
        "search",
        () => {
          this.filters.search = e.target.value
          this.applyFiltersAndSort()
        },
        300,
      )
    })

    this.bindEvent("clearSearch", "click", () => this.clearSearch())
    this.bindEvent("departmentFilter", "change", (e) => this.handleFilterChange("department", e.target.value))
    this.bindEvent("statusFilter", "change", (e) => this.handleFilterChange("status", e.target.value))

    this.bindEvent("minSalary", "input", (e) => {
      this.debounce(
        "minSalary",
        () => {
          this.filters.minSalary = e.target.value
          this.applyFiltersAndSort()
        },
        500,
      )
    })

    this.bindEvent("maxSalary", "input", (e) => {
      this.debounce(
        "maxSalary",
        () => {
          this.filters.maxSalary = e.target.value
          this.applyFiltersAndSort()
        },
        500,
      )
    })

    this.bindEvent("clearFilters", "click", () => this.clearAllFilters())

    // Table interactions
    this.bindEvent("selectAll", "change", (e) => this.handleSelectAll(e.target.checked))
    this.bindEvent("itemsPerPage", "change", (e) => this.changeItemsPerPage(Number.parseInt(e.target.value)))

    // Bulk actions
    this.bindEvent("bulkDeleteBtn", "click", () => this.handleBulkDelete())

    // Modal events
    this.bindEvent("modalClose", "click", () => this.closeEmployeeModal())
    this.bindEvent("modalCancel", "click", () => this.closeEmployeeModal())
    this.bindEvent("employeeForm", "submit", (e) => this.handleFormSubmit(e))

    // Table sorting (event delegation)
    document.addEventListener("click", (e) => {
      if (e.target.closest(".sortable")) {
        const sortField = e.target.closest(".sortable").dataset.sort
        this.handleSort(sortField)
      }
    })

    // Row selection (event delegation)
    document.addEventListener("change", (e) => {
      if (e.target.matches(".row-checkbox")) {
        const employeeId = Number.parseInt(e.target.dataset.id)
        this.handleRowSelection(employeeId, e.target.checked)
      }
    })

    // Action buttons (event delegation)
    document.addEventListener("click", (e) => {
      if (e.target.closest(".action-btn.edit")) {
        const employeeId = Number.parseInt(e.target.closest(".action-btn.edit").dataset.id)
        this.editEmployee(employeeId)
      } else if (e.target.closest(".action-btn.delete")) {
        const employeeId = Number.parseInt(e.target.closest(".action-btn.delete").dataset.id)
        this.deleteEmployee(employeeId)
      }
    })

    // Modal backdrop click
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal-backdrop")) {
        this.closeEmployeeModal()
      }
    })

    // Responsive sidebar
    window.addEventListener("resize", () => {
      this.debounce(
        "resize",
        () => {
          if (window.innerWidth > 1024) {
            this.sidebarOpen = false
            document.getElementById("sidebar").classList.remove("open")
          }
        },
        250,
      )
    })
  }

  /**
   * Setup keyboard shortcuts
   */
  setupKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
      // Escape key - close modal
      if (e.key === "Escape") {
        this.closeEmployeeModal()
      }

      // Ctrl/Cmd + N - new employee
      if ((e.ctrlKey || e.metaKey) && e.key === "n") {
        e.preventDefault()
        this.openEmployeeModal()
      }

      // Ctrl/Cmd + E - export
      if ((e.ctrlKey || e.metaKey) && e.key === "e") {
        e.preventDefault()
        this.exportToCSV()
      }

      // Delete key - delete selected
      if (e.key === "Delete" && this.selectedEmployees.size > 0) {
        this.handleBulkDelete()
      }
    })
  }

  /**
   * Apply filters and sorting
   */
  applyFiltersAndSort() {
    // Apply filters
    this.filteredEmployees = this.employees.filter((employee) => {
      // Search filter
      if (this.filters.search) {
        const searchTerm = this.filters.search.toLowerCase()
        const searchableText = [employee.name, employee.email, employee.position, employee.department]
          .join(" ")
          .toLowerCase()

        if (!searchableText.includes(searchTerm)) {
          return false
        }
      }

      // Department filter
      if (this.filters.department && employee.department !== this.filters.department) {
        return false
      }

      // Status filter
      if (this.filters.status && employee.status !== this.filters.status) {
        return false
      }

      // Salary range filter
      if (this.filters.minSalary && employee.salary < Number.parseInt(this.filters.minSalary)) {
        return false
      }

      if (this.filters.maxSalary && employee.salary > Number.parseInt(this.filters.maxSalary)) {
        return false
      }

      return true
    })

    // Apply sorting
    this.sortEmployees()

    // Reset pagination
    this.currentPage = 1
    this.selectedEmployees.clear()

    // Update UI
    this.renderEmployeeTable()
    this.renderPagination()
    this.updateResultsInfo()
    this.updateBulkActions()
  }

  /**
   * Sort employees based on current sort configuration
   */
  sortEmployees() {
    this.filteredEmployees.sort((a, b) => {
      let aValue = a[this.sortField]
      let bValue = b[this.sortField]

      // Handle different data types
      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      let comparison = 0
      if (aValue < bValue) {
        comparison = -1
      } else if (aValue > bValue) {
        comparison = 1
      }

      return this.sortDirection === "asc" ? comparison : -comparison
    })
  }

  /**
   * Handle table column sorting
   */
  handleSort(field) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc"
    } else {
      this.sortField = field
      this.sortDirection = "asc"
    }

    // Update sort indicators
    document.querySelectorAll(".sortable").forEach((header) => {
      header.classList.remove("sorted-asc", "sorted-desc")
    })

    const currentHeader = document.querySelector(`[data-sort="${field}"]`)
    if (currentHeader) {
      currentHeader.classList.add(`sorted-${this.sortDirection}`)
    }

    this.applyFiltersAndSort()
  }

  /**
   * Handle filter changes
   */
  handleFilterChange(filterType, value) {
    this.filters[filterType] = value
    this.applyFiltersAndSort()
  }

  /**
   * Clear search input
   */
  clearSearch() {
    document.getElementById("searchInput").value = ""
    this.filters.search = ""
    this.applyFiltersAndSort()
  }

  /**
   * Clear all filters
   */
  clearAllFilters() {
    this.filters = {
      search: "",
      department: "",
      status: "",
      minSalary: "",
      maxSalary: "",
    }

    // Reset form inputs
    document.getElementById("searchInput").value = ""
    document.getElementById("departmentFilter").value = ""
    document.getElementById("statusFilter").value = ""
    document.getElementById("minSalary").value = ""
    document.getElementById("maxSalary").value = ""

    this.applyFiltersAndSort()
    this.showToast("All filters cleared", "info")
  }

  /**
   * Render employee table
   */
  renderEmployeeTable() {
    const tbody = document.getElementById("employeeTableBody")
    const emptyState = document.getElementById("emptyState")

    const startIndex = (this.currentPage - 1) * this.itemsPerPage
    const endIndex = startIndex + this.itemsPerPage
    const pageEmployees = this.filteredEmployees.slice(startIndex, endIndex)

    if (pageEmployees.length === 0) {
      tbody.innerHTML = ""
      emptyState.style.display = "block"
      return
    }

    emptyState.style.display = "none"

    tbody.innerHTML = pageEmployees
      .map(
        (employee) => `
      <tr>
        <td class="checkbox-column">
          <input type="checkbox" class="checkbox row-checkbox" data-id="${employee.id}" 
                 ${this.selectedEmployees.has(employee.id) ? "checked" : ""}>
        </td>
        <td class="employee-name">${this.escapeHtml(employee.name)}</td>
        <td class="employee-email">${this.escapeHtml(employee.email)}</td>
        <td>${this.escapeHtml(employee.position)}</td>
        <td>${this.escapeHtml(employee.department)}</td>
        <td class="employee-salary">${this.formatCurrency(employee.salary)}</td>
        <td>
          <span class="status-badge ${employee.status.toLowerCase()}">
            ${employee.status}
          </span>
        </td>
        <td class="actions-column">
          <div class="action-buttons">
            <button class="action-btn edit" data-id="${employee.id}" title="Edit Employee">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"/>
              </svg>
            </button>
            <button class="action-btn delete" data-id="${employee.id}" title="Delete Employee">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/>
              </svg>
            </button>
          </div>
        </td>
      </tr>
    `,
      )
      .join("")
  }

  /**
   * Render pagination controls
   */
  renderPagination() {
    const totalPages = Math.ceil(this.filteredEmployees.length / this.itemsPerPage)
    const pagination = document.getElementById("pagination")

    if (totalPages <= 1) {
      pagination.innerHTML = ""
      return
    }

    let paginationHTML = ""

    // Previous button
    paginationHTML += `
      <button class="pagination-btn" ${this.currentPage === 1 ? "disabled" : ""} 
              onclick="employeeSystem.goToPage(${this.currentPage - 1})">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"/>
        </svg>
        Previous
      </button>
    `

    // Page numbers
    const startPage = Math.max(1, this.currentPage - 2)
    const endPage = Math.min(totalPages, this.currentPage + 2)

    if (startPage > 1) {
      paginationHTML += `<button class="pagination-btn" onclick="employeeSystem.goToPage(1)">1</button>`
      if (startPage > 2) {
        paginationHTML += `<span class="pagination-info">...</span>`
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      paginationHTML += `
        <button class="pagination-btn ${i === this.currentPage ? "active" : ""}" 
                onclick="employeeSystem.goToPage(${i})">
          ${i}
        </button>
      `
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        paginationHTML += `<span class="pagination-info">...</span>`
      }
      paginationHTML += `<button class="pagination-btn" onclick="employeeSystem.goToPage(${totalPages})">${totalPages}</button>`
    }

    // Next button
    paginationHTML += `
      <button class="pagination-btn" ${this.currentPage === totalPages ? "disabled" : ""} 
              onclick="employeeSystem.goToPage(${this.currentPage + 1})">
        Next
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
        </svg>
      </button>
    `

    pagination.innerHTML = paginationHTML
  }

  /**
   * Navigate to specific page
   */
  goToPage(page) {
    const totalPages = Math.ceil(this.filteredEmployees.length / this.itemsPerPage)
    if (page >= 1 && page <= totalPages) {
      this.currentPage = page
      this.renderEmployeeTable()
      this.renderPagination()
      this.updateResultsInfo()
    }
  }

  /**
   * Change items per page
   */
  changeItemsPerPage(itemsPerPage) {
    this.itemsPerPage = itemsPerPage
    this.currentPage = 1
    this.renderEmployeeTable()
    this.renderPagination()
    this.updateResultsInfo()
  }

  /**
   * Update results information
   */
  updateResultsInfo() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage + 1
    const endIndex = Math.min(this.currentPage * this.itemsPerPage, this.filteredEmployees.length)
    const total = this.filteredEmployees.length

    const resultsInfo = document.getElementById("resultsInfo")
    if (total === 0) {
      resultsInfo.textContent = "No employees found"
    } else {
      resultsInfo.textContent = `Showing ${startIndex}-${endIndex} of ${total} employees`
    }
  }

  /**
   * Update statistics
   */
  updateStatistics() {
    const totalEmployees = this.employees.length
    const activeEmployees = this.employees.filter((emp) => emp.status === "Active").length
    const departments = [...new Set(this.employees.map((emp) => emp.department))].length
    const avgSalary = this.employees.reduce((sum, emp) => sum + emp.salary, 0) / totalEmployees

    document.getElementById("totalEmployees").textContent = totalEmployees
    document.getElementById("activeEmployees").textContent = activeEmployees
    document.getElementById("totalDepartments").textContent = departments
    document.getElementById("averageSalary").textContent = this.formatCurrency(Math.round(avgSalary))
  }

  /**
   * Handle row selection
   */
  handleRowSelection(employeeId, checked) {
    if (checked) {
      this.selectedEmployees.add(employeeId)
    } else {
      this.selectedEmployees.delete(employeeId)
    }

    this.updateSelectAllCheckbox()
    this.updateBulkActions()
  }

  /**
   * Handle select all checkbox
   */
  handleSelectAll(checked) {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage
    const endIndex = startIndex + this.itemsPerPage
    const pageEmployees = this.filteredEmployees.slice(startIndex, endIndex)

    pageEmployees.forEach((employee) => {
      if (checked) {
        this.selectedEmployees.add(employee.id)
      } else {
        this.selectedEmployees.delete(employee.id)
      }
    })

    // Update row checkboxes
    document.querySelectorAll(".row-checkbox").forEach((checkbox) => {
      checkbox.checked = checked
    })

    this.updateBulkActions()
  }

  /**
   * Update select all checkbox state
   */
  updateSelectAllCheckbox() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage
    const endIndex = startIndex + this.itemsPerPage
    const pageEmployees = this.filteredEmployees.slice(startIndex, endIndex)

    const selectedOnPage = pageEmployees.filter((emp) => this.selectedEmployees.has(emp.id)).length
    const selectAllCheckbox = document.getElementById("selectAll")

    if (selectedOnPage === 0) {
      selectAllCheckbox.checked = false
      selectAllCheckbox.indeterminate = false
    } else if (selectedOnPage === pageEmployees.length) {
      selectAllCheckbox.checked = true
      selectAllCheckbox.indeterminate = false
    } else {
      selectAllCheckbox.checked = false
      selectAllCheckbox.indeterminate = true
    }
  }

  /**
   * Update bulk actions visibility
   */
  updateBulkActions() {
    const bulkActions = document.getElementById("bulkActions")
    const bulkSelected = document.getElementById("bulkSelected")

    if (this.selectedEmployees.size > 0) {
      bulkActions.style.display = "flex"
      bulkSelected.textContent = `${this.selectedEmployees.size} selected`
    } else {
      bulkActions.style.display = "none"
    }
  }

  /**
   * Handle bulk delete
   */
  async handleBulkDelete() {
    if (this.selectedEmployees.size === 0) return

    const confirmed = await this.showConfirmDialog(
      "Delete Selected Employees",
      `Are you sure you want to delete ${this.selectedEmployees.size} selected employee(s)? This action cannot be undone.`,
    )

    if (confirmed) {
      try {
        this.employees = this.employees.filter((emp) => !this.selectedEmployees.has(emp.id))
        this.selectedEmployees.clear()
        this.applyFiltersAndSort()
        this.updateStatistics()
        this.showToast("Selected employees deleted successfully", "success")
      } catch (error) {
        this.handleError("Failed to delete employees", error)
      }
    }
  }

  /**
   * Open employee modal
   */
  openEmployeeModal(employee = null) {
    this.editingEmployee = employee
    const modal = document.getElementById("employeeModal")
    const form = document.getElementById("employeeForm")
    const title = document.getElementById("modalTitle")

    // Reset form and errors
    form.reset()
    this.clearFormErrors()

    if (employee) {
      title.textContent = "Edit Employee"
      this.populateForm(employee)
    } else {
      title.textContent = "Add New Employee"
    }

    modal.classList.add("show")
    document.body.style.overflow = "hidden"

    // Focus first input
    setTimeout(() => {
      document.getElementById("employeeName").focus()
    }, 100)
  }

  /**
   * Close employee modal
   */
  closeEmployeeModal() {
    const modal = document.getElementById("employeeModal")
    modal.classList.remove("show")
    document.body.style.overflow = ""
    this.editingEmployee = null
    this.clearFormErrors()
  }

  /**
   * Populate form with employee data
   */
  populateForm(employee) {
    document.getElementById("employeeName").value = employee.name
    document.getElementById("employeeEmail").value = employee.email
    document.getElementById("employeePosition").value = employee.position
    document.getElementById("employeeDepartment").value = employee.department
    document.getElementById("employeeSalary").value = employee.salary
    document.getElementById("employeeStatus").value = employee.status
    document.getElementById("employeePhone").value = employee.phone || ""
  }

  /**
   * Handle form submission
   */
  async handleFormSubmit(e) {
    e.preventDefault()

    if (!this.validateForm()) {
      return
    }

    const formData = new FormData(e.target)
    const employeeData = {
      name: formData.get("name").trim(),
      email: formData.get("email").trim(),
      position: formData.get("position").trim(),
      department: formData.get("department"),
      salary: Number.parseInt(formData.get("salary")),
      status: formData.get("status"),
      phone: formData.get("phone").trim(),
    }

    try {
      this.showSaveLoading(true)

      // Simulate API call
      await this.delay(1000)

      if (this.editingEmployee) {
        // Update existing employee
        const index = this.employees.findIndex((emp) => emp.id === this.editingEmployee.id)
        this.employees[index] = { ...this.employees[index], ...employeeData }
        this.showToast("Employee updated successfully!", "success")
      } else {
        // Add new employee
        const newEmployee = {
          id: Date.now(),
          ...employeeData,
          joinDate: new Date().toISOString().split("T")[0],
        }
        this.employees.push(newEmployee)
        this.showToast("Employee added successfully!", "success")
      }

      this.applyFiltersAndSort()
      this.updateStatistics()
      this.closeEmployeeModal()
    } catch (error) {
      this.handleError("Failed to save employee", error)
    } finally {
      this.showSaveLoading(false)
    }
  }

  /**
   * Validate form data
   */
  validateForm() {
    let isValid = true
    this.clearFormErrors()

    // Name validation
    const name = document.getElementById("employeeName").value.trim()
    if (!name) {
      this.showFieldError("nameError", "Name is required")
      isValid = false
    } else if (name.length < 2) {
      this.showFieldError("nameError", "Name must be at least 2 characters")
      isValid = false
    }

    // Email validation
    const email = document.getElementById("employeeEmail").value.trim()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
      this.showFieldError("emailError", "Email is required")
      isValid = false
    } else if (!emailRegex.test(email)) {
      this.showFieldError("emailError", "Please enter a valid email address")
      isValid = false
    } else {
      // Check for duplicate email
      const existingEmployee = this.employees.find(
        (emp) =>
          emp.email.toLowerCase() === email.toLowerCase() &&
          (!this.editingEmployee || emp.id !== this.editingEmployee.id),
      )
      if (existingEmployee) {
        this.showFieldError("emailError", "This email is already in use")
        isValid = false
      }
    }

    // Position validation
    const position = document.getElementById("employeePosition").value.trim()
    if (!position) {
      this.showFieldError("positionError", "Position is required")
      isValid = false
    }

    // Department validation
    const department = document.getElementById("employeeDepartment").value
    if (!department) {
      this.showFieldError("departmentError", "Department is required")
      isValid = false
    }

    // Salary validation
    const salary = document.getElementById("employeeSalary").value
    if (!salary) {
      this.showFieldError("salaryError", "Salary is required")
      isValid = false
    } else if (Number.parseInt(salary) < 0) {
      this.showFieldError("salaryError", "Salary must be a positive number")
      isValid = false
    } else if (Number.parseInt(salary) < 20000) {
      this.showFieldError("salaryError", "Salary must be at least $20,000")
      isValid = false
    }

    // Status validation
    const status = document.getElementById("employeeStatus").value
    if (!status) {
      this.showFieldError("statusError", "Status is required")
      isValid = false
    }

    return isValid
  }

  /**
   * Show field error
   */
  showFieldError(errorId, message) {
    const errorElement = document.getElementById(errorId)
    if (errorElement) {
      errorElement.textContent = message
    }
  }

  /**
   * Clear form errors
   */
  clearFormErrors() {
    document.querySelectorAll(".form-error").forEach((element) => {
      element.textContent = ""
    })
  }

  /**
   * Edit employee
   */
  editEmployee(id) {
    const employee = this.employees.find((emp) => emp.id === id)
    if (employee) {
      this.openEmployeeModal(employee)
    }
  }

  /**
   * Delete employee
   */
  async deleteEmployee(id) {
    const employee = this.employees.find((emp) => emp.id === id)
    if (!employee) return

    const confirmed = await this.showConfirmDialog(
      "Delete Employee",
      `Are you sure you want to delete ${employee.name}? This action cannot be undone.`,
    )

    if (confirmed) {
      try {
        this.employees = this.employees.filter((emp) => emp.id !== id)
        this.selectedEmployees.delete(id)
        this.applyFiltersAndSort()
        this.updateStatistics()
        this.showToast(`${employee.name} has been deleted`, "success")
      } catch (error) {
        this.handleError("Failed to delete employee", error)
      }
    }
  }

  /**
   * Export data to CSV
   */
  exportToCSV() {
    try {
      const headers = ["Name", "Email", "Position", "Department", "Salary", "Status", "Phone", "Join Date"]
      const csvContent = [
        headers.join(","),
        ...this.filteredEmployees.map((emp) =>
          [
            `"${emp.name}"`,
            `"${emp.email}"`,
            `"${emp.position}"`,
            `"${emp.department}"`,
            emp.salary,
            `"${emp.status}"`,
            `"${emp.phone || ""}"`,
            `"${emp.joinDate || ""}"`,
          ].join(","),
        ),
      ].join("\n")

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const link = document.createElement("a")
      const url = URL.createObjectURL(blob)

      link.setAttribute("href", url)
      link.setAttribute("download", `employees_${new Date().toISOString().split("T")[0]}.csv`)
      link.style.visibility = "hidden"

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      this.showToast("Employee data exported successfully!", "success")
    } catch (error) {
      this.handleError("Failed to export data", error)
    }
  }

  /**
   * Toggle sidebar (mobile)
   */
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen
    const sidebar = document.getElementById("sidebar")

    if (this.sidebarOpen) {
      sidebar.classList.add("open")
    } else {
      sidebar.classList.remove("open")
    }
  }

  /**
   * Show loading screen
   */
  showLoading() {
    document.getElementById("loadingScreen").classList.remove("hidden")
  }

  /**
   * Hide loading screen
   */
  hideLoading() {
    document.getElementById("loadingScreen").classList.add("hidden")
  }

  /**
   * Show/hide save loading state
   */
  showSaveLoading(show) {
    const saveLoading = document.getElementById("saveLoading")
    const saveText = document.getElementById("saveText")
    const saveBtn = document.getElementById("modalSave")

    if (show) {
      saveBtn.disabled = true
      saveLoading.style.display = "inline-block"
      saveText.textContent = "Saving..."
    } else {
      saveBtn.disabled = false
      saveLoading.style.display = "none"
      saveText.textContent = "Save Employee"
    }
  }

  /**
   * Show toast notification
   */
  showToast(message, type = "info") {
    const container = document.getElementById("toastContainer")
    const toast = document.createElement("div")

    const icons = {
      success: "✅",
      error: "❌",
      info: "ℹ️",
      warning: "⚠️",
    }

    toast.className = `toast ${type}`
    toast.innerHTML = `
      <span style="font-size: 1.2em;">${icons[type] || icons.info}</span>
      <span>${this.escapeHtml(message)}</span>
    `

    container.appendChild(toast)

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (toast.parentNode) {
        toast.style.opacity = "0"
        toast.style.transform = "translateX(100%)"
        setTimeout(() => {
          if (toast.parentNode) {
            container.removeChild(toast)
          }
        }, 300)
      }
    }, 5000)

    // Click to dismiss
    toast.addEventListener("click", () => {
      if (toast.parentNode) {
        toast.style.opacity = "0"
        toast.style.transform = "translateX(100%)"
        setTimeout(() => {
          if (toast.parentNode) {
            container.removeChild(toast)
          }
        }, 300)
      }
    })
  }

  /**
   * Show confirmation dialog
   */
  showConfirmDialog(title, message) {
    return new Promise((resolve) => {
      const confirmed = confirm(`${title}\n\n${message}`)
      resolve(confirmed)
    })
  }

  /**
   * Handle errors
   */
  handleError(message, error) {
    console.error(message, error)
    this.showToast(message, "error")
  }

  /**
   * Utility: Bind event listener
   */
  bindEvent(elementId, event, handler) {
    const element = document.getElementById(elementId)
    if (element) {
      element.addEventListener(event, handler)
    }
  }

  /**
   * Utility: Debounce function calls
   */
  debounce(key, func, delay) {
    if (this.debounceTimers.has(key)) {
      clearTimeout(this.debounceTimers.get(key))
    }

    const timer = setTimeout(() => {
      func()
      this.debounceTimers.delete(key)
    }, delay)

    this.debounceTimers.set(key, timer)
  }

  /**
   * Utility: Delay function
   */
  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  /**
   * Utility: Format currency
   */
  formatCurrency(amount) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  /**
   * Utility: Escape HTML
   */
  escapeHtml(text) {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    }
    return text.toString().replace(/[&<>"']/g, (m) => map[m])
  }
}

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  window.employeeSystem = new EmployeeManagementSystem()
})

// Handle global errors
window.addEventListener("error", (event) => {
  console.error("Global error:", event.error)
  if (window.employeeSystem) {
    window.employeeSystem.showToast("An unexpected error occurred", "error")
  }
})

// Handle unhandled promise rejections
window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled promise rejection:", event.reason)
  if (window.employeeSystem) {
    window.employeeSystem.showToast("An unexpected error occurred", "error")
  }
})
