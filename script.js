// Employee Management Dashboard - Vanilla JavaScript Implementation

class EmployeeManager {
  constructor() {
    // Initial employee data
    this.employees = [
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@company.com",
        department: "Engineering",
        position: "Senior Developer",
        salary: 85000,
        joinDate: "2022-01-15",
        status: "Active",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@company.com",
        department: "Marketing",
        position: "Marketing Manager",
        salary: 75000,
        joinDate: "2021-08-20",
        status: "Active",
      },
      {
        id: 3,
        name: "Mike Johnson",
        email: "mike.johnson@company.com",
        department: "Sales",
        position: "Sales Representative",
        salary: 55000,
        joinDate: "2023-03-10",
        status: "Active",
      },
      {
        id: 4,
        name: "Sarah Wilson",
        email: "sarah.wilson@company.com",
        department: "HR",
        position: "HR Specialist",
        salary: 60000,
        joinDate: "2022-11-05",
        status: "Active",
      },
      {
        id: 5,
        name: "David Brown",
        email: "david.brown@company.com",
        department: "Engineering",
        position: "Frontend Developer",
        salary: 70000,
        joinDate: "2023-01-12",
        status: "Active",
      },
      {
        id: 6,
        name: "Lisa Davis",
        email: "lisa.davis@company.com",
        department: "Finance",
        position: "Financial Analyst",
        salary: 65000,
        joinDate: "2022-06-18",
        status: "Active",
      },
      {
        id: 7,
        name: "Tom Anderson",
        email: "tom.anderson@company.com",
        department: "Engineering",
        position: "DevOps Engineer",
        salary: 80000,
        joinDate: "2021-12-03",
        status: "Inactive",
      },
      {
        id: 8,
        name: "Emily Taylor",
        email: "emily.taylor@company.com",
        department: "Marketing",
        position: "Content Specialist",
        salary: 50000,
        joinDate: "2023-05-22",
        status: "Active",
      },
    ]

    // State management
    this.filteredEmployees = [...this.employees]
    this.currentPage = 1
    this.itemsPerPage = 5
    this.sortField = "name"
    this.sortDirection = "asc"
    this.searchTerm = ""
    this.departmentFilter = "all"
    this.statusFilter = "all"

    // Initialize the application
    this.init()
  }

  init() {
    this.bindEvents()
    this.populateDepartmentFilters()
    this.updateDisplay()
    this.updateStatistics()
    this.updateSidebar()
  }

  bindEvents() {
    // Sidebar toggle
    const sidebarToggle = document.getElementById("sidebarToggle")
    const sidebar = document.getElementById("sidebar")
    const mainContent = document.querySelector(".main-content")

    sidebarToggle?.addEventListener("click", () => {
      sidebar.classList.toggle("open")
    })

    // Close sidebar when clicking outside on mobile
    document.addEventListener("click", (e) => {
      if (window.innerWidth <= 1024) {
        if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
          sidebar.classList.remove("open")
        }
      }
    })

    // Search functionality
    const searchInput = document.getElementById("searchInput")
    searchInput?.addEventListener("input", (e) => {
      this.searchTerm = e.target.value.toLowerCase()
      this.currentPage = 1
      this.filterAndSortEmployees()
      this.updateDisplay()
    })

    // Filter functionality
    const departmentFilter = document.getElementById("departmentFilter")
    departmentFilter?.addEventListener("change", (e) => {
      this.departmentFilter = e.target.value
      this.currentPage = 1
      this.filterAndSortEmployees()
      this.updateDisplay()
    })

    const statusFilter = document.getElementById("statusFilter")
    statusFilter?.addEventListener("change", (e) => {
      this.statusFilter = e.target.value
      this.currentPage = 1
      this.filterAndSortEmployees()
      this.updateDisplay()
    })

    // Table sorting
    const sortableHeaders = document.querySelectorAll(".sortable")
    sortableHeaders.forEach((header) => {
      header.addEventListener("click", () => {
        const sortField = header.getAttribute("data-sort")
        this.handleSort(sortField)
      })
    })

    // Pagination
    const prevPageBtn = document.getElementById("prevPage")
    const nextPageBtn = document.getElementById("nextPage")

    prevPageBtn?.addEventListener("click", () => {
      if (this.currentPage > 1) {
        this.currentPage--
        this.updateDisplay()
      }
    })

    nextPageBtn?.addEventListener("click", () => {
      const totalPages = Math.ceil(this.filteredEmployees.length / this.itemsPerPage)
      if (this.currentPage < totalPages) {
        this.currentPage++
        this.updateDisplay()
      }
    })

    // Modal functionality
    const addEmployeeBtn = document.getElementById("addEmployeeBtn")
    const modal = document.getElementById("addEmployeeModal")
    const closeModalBtn = document.getElementById("closeModal")
    const cancelBtn = document.getElementById("cancelBtn")
    const modalOverlay = document.querySelector(".modal-overlay")

    addEmployeeBtn?.addEventListener("click", () => {
      this.openModal()
    })

    closeModalBtn?.addEventListener("click", () => {
      this.closeModal()
    })

    cancelBtn?.addEventListener("click", () => {
      this.closeModal()
    })

    modalOverlay?.addEventListener("click", () => {
      this.closeModal()
    })

    // Form submission
    const addEmployeeForm = document.getElementById("addEmployeeForm")
    addEmployeeForm?.addEventListener("submit", (e) => {
      e.preventDefault()
      this.handleAddEmployee()
    })

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        this.closeModal()
      }
    })

    // Window resize handler
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1024) {
        sidebar.classList.remove("open")
      }
    })
  }

  populateDepartmentFilters() {
    const departments = [...new Set(this.employees.map((emp) => emp.department))]
    const departmentFilter = document.getElementById("departmentFilter")
    const employeeDepartment = document.getElementById("employeeDepartment")

    // Clear existing options (except "All Departments")
    if (departmentFilter) {
      const allOption = departmentFilter.querySelector('option[value="all"]')
      departmentFilter.innerHTML = ""
      departmentFilter.appendChild(allOption)

      departments.forEach((dept) => {
        const option = document.createElement("option")
        option.value = dept
        option.textContent = dept
        departmentFilter.appendChild(option)
      })
    }

    // Update modal department select
    if (employeeDepartment) {
      const selectOption = employeeDepartment.querySelector('option[value=""]')
      const existingOptions = Array.from(employeeDepartment.querySelectorAll('option[value]:not([value=""])'))

      existingOptions.forEach((option) => {
        if (!departments.includes(option.value)) {
          option.remove()
        }
      })

      departments.forEach((dept) => {
        if (!employeeDepartment.querySelector(`option[value="${dept}"]`)) {
          const option = document.createElement("option")
          option.value = dept
          option.textContent = dept
          employeeDepartment.appendChild(option)
        }
      })
    }
  }

  filterAndSortEmployees() {
    // Filter employees
    this.filteredEmployees = this.employees.filter((employee) => {
      const matchesSearch =
        employee.name.toLowerCase().includes(this.searchTerm) ||
        employee.email.toLowerCase().includes(this.searchTerm) ||
        employee.position.toLowerCase().includes(this.searchTerm)

      const matchesDepartment = this.departmentFilter === "all" || employee.department === this.departmentFilter
      const matchesStatus = this.statusFilter === "all" || employee.status === this.statusFilter

      return matchesSearch && matchesDepartment && matchesStatus
    })

    // Sort employees
    this.filteredEmployees.sort((a, b) => {
      const aValue = a[this.sortField]
      const bValue = b[this.sortField]

      if (typeof aValue === "string" && typeof bValue === "string") {
        const comparison = aValue.localeCompare(bValue)
        return this.sortDirection === "asc" ? comparison : -comparison
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return this.sortDirection === "asc" ? aValue - bValue : bValue - aValue
      }

      return 0
    })
  }

  handleSort(field) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc"
    } else {
      this.sortField = field
      this.sortDirection = "asc"
    }

    this.filterAndSortEmployees()
    this.updateDisplay()
    this.updateSortIcons()
  }

  updateSortIcons() {
    // Reset all sort icons
    document.querySelectorAll(".sortable").forEach((header) => {
      header.classList.remove("sort-asc", "sort-desc")
    })

    // Set active sort icon
    const activeHeader = document.querySelector(`[data-sort="${this.sortField}"]`)
    if (activeHeader) {
      activeHeader.classList.add(this.sortDirection === "asc" ? "sort-asc" : "sort-desc")
    }
  }

  updateDisplay() {
    this.showLoading()

    // Simulate loading delay for better UX
    setTimeout(() => {
      this.renderEmployeeTable()
      this.renderPagination()
      this.hideLoading()
    }, 300)
  }

  showLoading() {
    const tableLoading = document.getElementById("tableLoading")
    const employeeTable = document.getElementById("employeeTable")

    if (tableLoading && employeeTable) {
      tableLoading.classList.remove("hidden")
      employeeTable.style.opacity = "0.5"
    }
  }

  hideLoading() {
    const tableLoading = document.getElementById("tableLoading")
    const employeeTable = document.getElementById("employeeTable")

    if (tableLoading && employeeTable) {
      tableLoading.classList.add("hidden")
      employeeTable.style.opacity = "1"
    }
  }

  renderEmployeeTable() {
    const tbody = document.getElementById("employeeTableBody")
    if (!tbody) return

    const startIndex = (this.currentPage - 1) * this.itemsPerPage
    const endIndex = startIndex + this.itemsPerPage
    const paginatedEmployees = this.filteredEmployees.slice(startIndex, endIndex)

    tbody.innerHTML = ""

    if (paginatedEmployees.length === 0) {
      const row = document.createElement("tr")
      row.innerHTML = `
                <td colspan="6" style="text-align: center; padding: 2rem; color: var(--neutral-500);">
                    <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 1rem; display: block;"></i>
                    No employees found matching your criteria.
                </td>
            `
      tbody.appendChild(row)
      return
    }

    paginatedEmployees.forEach((employee) => {
      const row = document.createElement("tr")
      row.innerHTML = `
                <td>
                    <div class="employee-info">
                        <div class="employee-name">${this.escapeHtml(employee.name)}</div>
                        <div class="employee-email">${this.escapeHtml(employee.email)}</div>
                    </div>
                </td>
                <td>
                    <span class="badge badge-department">${this.escapeHtml(employee.department)}</span>
                </td>
                <td>${this.escapeHtml(employee.position)}</td>
                <td class="salary">$${employee.salary.toLocaleString()}</td>
                <td>
                    <span class="badge ${employee.status === "Active" ? "badge-active" : "badge-inactive"}">
                        ${employee.status}
                    </span>
                </td>
                <td>${this.formatDate(employee.joinDate)}</td>
            `
      tbody.appendChild(row)
    })

    this.updateSortIcons()
  }

  renderPagination() {
    const totalPages = Math.ceil(this.filteredEmployees.length / this.itemsPerPage)
    const startIndex = (this.currentPage - 1) * this.itemsPerPage
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.filteredEmployees.length)

    // Update pagination info
    const paginationInfo = document.getElementById("paginationInfo")
    if (paginationInfo) {
      paginationInfo.textContent = `Showing ${startIndex + 1} to ${endIndex} of ${this.filteredEmployees.length} employees`
    }

    // Update pagination controls
    const prevPageBtn = document.getElementById("prevPage")
    const nextPageBtn = document.getElementById("nextPage")
    const pageNumbers = document.getElementById("pageNumbers")

    if (prevPageBtn) {
      prevPageBtn.disabled = this.currentPage === 1
    }

    if (nextPageBtn) {
      nextPageBtn.disabled = this.currentPage === totalPages || totalPages === 0
    }

    // Render page numbers
    if (pageNumbers) {
      pageNumbers.innerHTML = ""

      if (totalPages <= 7) {
        // Show all pages if 7 or fewer
        for (let i = 1; i <= totalPages; i++) {
          pageNumbers.appendChild(this.createPageButton(i))
        }
      } else {
        // Show first page
        pageNumbers.appendChild(this.createPageButton(1))

        if (this.currentPage > 4) {
          const ellipsis = document.createElement("span")
          ellipsis.textContent = "..."
          ellipsis.className = "page-ellipsis"
          pageNumbers.appendChild(ellipsis)
        }

        // Show pages around current page
        const start = Math.max(2, this.currentPage - 1)
        const end = Math.min(totalPages - 1, this.currentPage + 1)

        for (let i = start; i <= end; i++) {
          pageNumbers.appendChild(this.createPageButton(i))
        }

        if (this.currentPage < totalPages - 3) {
          const ellipsis = document.createElement("span")
          ellipsis.textContent = "..."
          ellipsis.className = "page-ellipsis"
          pageNumbers.appendChild(ellipsis)
        }

        // Show last page
        if (totalPages > 1) {
          pageNumbers.appendChild(this.createPageButton(totalPages))
        }
      }
    }
  }

  createPageButton(pageNumber) {
    const button = document.createElement("button")
    button.textContent = pageNumber
    button.className = `page-btn ${pageNumber === this.currentPage ? "active" : ""}`
    button.addEventListener("click", () => {
      this.currentPage = pageNumber
      this.updateDisplay()
    })
    return button
  }

  updateStatistics() {
    const activeEmployees = this.employees.filter((emp) => emp.status === "Active")
    const departments = [...new Set(this.employees.map((emp) => emp.department))]
    const totalSalary = activeEmployees.reduce((sum, emp) => sum + emp.salary, 0)
    const averageSalary = activeEmployees.length > 0 ? Math.round(totalSalary / activeEmployees.length) : 0

    // Update main statistics
    const totalEmployeesEl = document.getElementById("totalEmployees")
    const activeEmployeesTextEl = document.getElementById("activeEmployeesText")
    const totalDepartmentsEl = document.getElementById("totalDepartments")
    const averageSalaryEl = document.getElementById("averageSalary")

    if (totalEmployeesEl) totalEmployeesEl.textContent = this.employees.length
    if (activeEmployeesTextEl) activeEmployeesTextEl.textContent = `${activeEmployees.length} active`
    if (totalDepartmentsEl) totalDepartmentsEl.textContent = departments.length
    if (averageSalaryEl) averageSalaryEl.textContent = `$${averageSalary.toLocaleString()}`

    // Update quick stats in sidebar
    const quickActiveCount = document.getElementById("quickActiveCount")
    const quickDeptCount = document.getElementById("quickDeptCount")
    const quickAvgSalary = document.getElementById("quickAvgSalary")

    if (quickActiveCount) quickActiveCount.textContent = activeEmployees.length
    if (quickDeptCount) quickDeptCount.textContent = departments.length
    if (quickAvgSalary) quickAvgSalary.textContent = `$${Math.round(averageSalary / 1000)}k`
  }

  updateSidebar() {
    const departmentCounts = this.employees.reduce((acc, emp) => {
      acc[emp.department] = (acc[emp.department] || 0) + 1
      return acc
    }, {})

    const departmentOverview = document.getElementById("departmentOverview")
    if (departmentOverview) {
      departmentOverview.innerHTML = ""

      Object.entries(departmentCounts).forEach(([dept, count]) => {
        const deptItem = document.createElement("div")
        deptItem.className = "dept-item"
        deptItem.innerHTML = `
                    <div class="dept-info">
                        <i class="fas fa-building"></i>
                        <span class="dept-name">${this.escapeHtml(dept)}</span>
                    </div>
                    <span class="dept-count">${count}</span>
                `
        departmentOverview.appendChild(deptItem)
      })
    }
  }

  openModal() {
    const modal = document.getElementById("addEmployeeModal")
    if (modal) {
      modal.classList.remove("hidden")
      document.body.style.overflow = "hidden"

      // Focus first input
      const firstInput = modal.querySelector("input")
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 100)
      }
    }
  }

  closeModal() {
    const modal = document.getElementById("addEmployeeModal")
    if (modal) {
      modal.classList.add("hidden")
      document.body.style.overflow = ""
      this.resetForm()
    }
  }

  resetForm() {
    const form = document.getElementById("addEmployeeForm")
    if (form) {
      form.reset()
      this.clearErrors()
    }
  }

  clearErrors() {
    const errorElements = document.querySelectorAll(".error-message")
    const inputElements = document.querySelectorAll(".form-input, .form-select")

    errorElements.forEach((el) => (el.textContent = ""))
    inputElements.forEach((el) => el.classList.remove("error"))
  }

  validateForm(formData) {
    const errors = {}

    if (!formData.name.trim()) {
      errors.name = "Full name is required"
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!this.isValidEmail(formData.email)) {
      errors.email = "Please enter a valid email address"
    } else if (this.employees.some((emp) => emp.email.toLowerCase() === formData.email.toLowerCase())) {
      errors.email = "Email already exists"
    }

    if (!formData.department) {
      errors.department = "Department is required"
    }

    if (!formData.position.trim()) {
      errors.position = "Position is required"
    }

    if (!formData.salary || formData.salary <= 0) {
      errors.salary = "Please enter a valid salary"
    }

    return errors
  }

  displayErrors(errors) {
    this.clearErrors()

    Object.keys(errors).forEach((field) => {
      const errorElement = document.getElementById(`${field}Error`)
      const inputElement = document.getElementById(`employee${field.charAt(0).toUpperCase() + field.slice(1)}`)

      if (errorElement) {
        errorElement.textContent = errors[field]
      }

      if (inputElement) {
        inputElement.classList.add("error")
      }
    })
  }

  async handleAddEmployee() {
    const form = document.getElementById("addEmployeeForm")
    const submitBtn = document.getElementById("submitBtn")

    if (!form || !submitBtn) return

    const formData = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      department: form.department.value,
      position: form.position.value.trim(),
      salary: Number.parseInt(form.salary.value),
    }

    // Validate form
    const errors = this.validateForm(formData)
    if (Object.keys(errors).length > 0) {
      this.displayErrors(errors)
      return
    }

    // Show loading state
    submitBtn.classList.add("loading")
    submitBtn.disabled = true

    try {
      // Simulate API call
      await this.simulateApiCall(1000)

      // Add employee
      const newEmployee = {
        id: Math.max(...this.employees.map((e) => e.id)) + 1,
        name: formData.name,
        email: formData.email,
        department: formData.department,
        position: formData.position,
        salary: formData.salary,
        joinDate: new Date().toISOString().split("T")[0],
        status: "Active",
      }

      this.employees.push(newEmployee)
      this.filterAndSortEmployees()
      this.updateDisplay()
      this.updateStatistics()
      this.updateSidebar()
      this.populateDepartmentFilters()

      this.closeModal()
      this.showSuccessMessage("Employee added successfully!")
    } catch (error) {
      console.error("Error adding employee:", error)
      this.showErrorMessage("Failed to add employee. Please try again.")
    } finally {
      submitBtn.classList.remove("loading")
      submitBtn.disabled = false
    }
  }

  simulateApiCall(delay) {
    return new Promise((resolve) => setTimeout(resolve, delay))
  }

  showSuccessMessage(message) {
    this.showToast(message, "success")
  }

  showErrorMessage(message) {
    this.showToast(message, "error")
  }

  showToast(message, type = "info") {
    // Create toast element
    const toast = document.createElement("div")
    toast.className = `toast toast-${type}`
    toast.innerHTML = `
            <div class="toast-content">
                <i class="fas ${type === "success" ? "fa-check-circle" : type === "error" ? "fa-exclamation-circle" : "fa-info-circle"}"></i>
                <span>${this.escapeHtml(message)}</span>
            </div>
        `

    // Add toast styles if not already added
    if (!document.querySelector(".toast-styles")) {
      const style = document.createElement("style")
      style.className = "toast-styles"
      style.textContent = `
                .toast {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: var(--white);
                    border: 1px solid var(--neutral-200);
                    border-radius: var(--border-radius);
                    box-shadow: var(--shadow-lg);
                    padding: 1rem;
                    z-index: 4000;
                    min-width: 300px;
                    animation: slideIn 0.3s ease;
                }
                
                .toast-success {
                    border-left: 4px solid var(--success-green);
                }
                
                .toast-error {
                    border-left: 4px solid var(--danger-red);
                }
                
                .toast-content {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }
                
                .toast-success .toast-content i {
                    color: var(--success-green);
                }
                
                .toast-error .toast-content i {
                    color: var(--danger-red);
                }
                
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `
      document.head.appendChild(style)
    }

    // Add toast to DOM
    document.body.appendChild(toast)

    // Remove toast after 3 seconds
    setTimeout(() => {
      toast.style.animation = "slideOut 0.3s ease"
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast)
        }
      }, 300)
    }, 3000)
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  formatDate(dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  escapeHtml(text) {
    const div = document.createElement("div")
    div.textContent = text
    return div.innerHTML
  }

  // Error handling
  handleError(error, context = "") {
    console.error(`Error in ${context}:`, error)
    this.showErrorMessage("An unexpected error occurred. Please try again.")
  }

  // Data persistence (localStorage)
  saveToLocalStorage() {
    try {
      localStorage.setItem("employeeData", JSON.stringify(this.employees))
    } catch (error) {
      console.warn("Could not save to localStorage:", error)
    }
  }

  loadFromLocalStorage() {
    try {
      const saved = localStorage.getItem("employeeData")
      if (saved) {
        this.employees = JSON.parse(saved)
        return true
      }
    } catch (error) {
      console.warn("Could not load from localStorage:", error)
    }
    return false
  }

  // Export functionality (bonus feature)
  exportToCSV() {
    const headers = ["Name", "Email", "Department", "Position", "Salary", "Join Date", "Status"]
    const csvContent = [
      headers.join(","),
      ...this.employees.map((emp) =>
        [
          `"${emp.name}"`,
          `"${emp.email}"`,
          `"${emp.department}"`,
          `"${emp.position}"`,
          emp.salary,
          emp.joinDate,
          emp.status,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "employees.csv"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }
}

// Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  try {
    window.employeeManager = new EmployeeManager()
  } catch (error) {
    console.error("Failed to initialize Employee Manager:", error)

    // Show fallback error message
    const errorDiv = document.createElement("div")
    errorDiv.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 2rem;
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                text-align: center;
                z-index: 9999;
            ">
                <h2 style="color: #ef4444; margin-bottom: 1rem;">
                    <i class="fas fa-exclamation-triangle"></i>
                    Application Error
                </h2>
                <p style="margin-bottom: 1rem;">
                    Failed to initialize the Employee Management Dashboard.
                </p>
                <button onclick="location.reload()" style="
                    background: #2563eb;
                    color: white;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 4px;
                    cursor: pointer;
                ">
                    Reload Page
                </button>
            </div>
        `
    document.body.appendChild(errorDiv)
  }
})

// Service Worker registration for offline functionality (optional)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}

// Global error handler
window.addEventListener("error", (event) => {
  console.error("Global error:", event.error)
  if (window.employeeManager) {
    window.employeeManager.handleError(event.error, "Global")
  }
})

// Handle unhandled promise rejections
window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled promise rejection:", event.reason)
  if (window.employeeManager) {
    window.employeeManager.handleError(event.reason, "Promise")
  }
})
