function validateTaskInput(input) {
  const value = input.value.trim();
  if (value.length === 0) {
    showError(input, "Task name is required");
    return false;
  }
  if (value.length > 100) {
    showError(input, "Task name must be less than 100 characters");
    return false;
  }
  hideError(input);
  return true;
}

function validatePrioritySelect(select) {
  const value = select.value;
  if (!value) {
    showError(select, "Please select a priority");
    return false;
  }
  hideError(select);
  return true;
}

function showError(element, message) {
  const existingError = element.parentNode.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }
  
  element.classList.add('error');
  
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  errorDiv.style.color = '#e74c3c';
  errorDiv.style.fontSize = '12px';
  errorDiv.style.marginTop = '5px';
  element.parentNode.appendChild(errorDiv);
}

function hideError(element) {
  element.classList.remove('error');
  const errorMessage = element.parentNode.querySelector('.error-message');
  if (errorMessage) {
    errorMessage.remove();
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const addTaskForm = document.getElementById('addTaskForm');
  if (addTaskForm) {
    const taskInput = addTaskForm.querySelector('input[name="task"]');
    const prioritySelect = addTaskForm.querySelector('select[name="priority"]');
    
    taskInput.addEventListener('blur', () => validateTaskInput(taskInput));
    taskInput.addEventListener('input', () => {
      if (taskInput.classList.contains('error')) {
        validateTaskInput(taskInput);
      }
    });
    
    prioritySelect.addEventListener('change', () => validatePrioritySelect(prioritySelect));
    
    addTaskForm.addEventListener('submit', function(e) {
      const isTaskValid = validateTaskInput(taskInput);
      const isPriorityValid = validatePrioritySelect(prioritySelect);
      
      if (!isTaskValid || !isPriorityValid) {
        e.preventDefault();
        return false;
      }
    });
  }
  
  const editForms = document.querySelectorAll('.editForm');
  editForms.forEach(form => {
    const taskInput = form.querySelector('input[name="newTask"]');
    const prioritySelect = form.querySelector('select[name="newPriority"]');
    
    taskInput.addEventListener('blur', () => validateTaskInput(taskInput));
    taskInput.addEventListener('input', () => {
      if (taskInput.classList.contains('error')) {
        validateTaskInput(taskInput);
      }
    });
    
    prioritySelect.addEventListener('change', () => validatePrioritySelect(prioritySelect));
    
    form.addEventListener('submit', function(e) {
      const isTaskValid = validateTaskInput(taskInput);
      const isPriorityValid = validatePrioritySelect(prioritySelect);
      
      if (!isTaskValid || !isPriorityValid) {
        e.preventDefault();
        return false;
      }
    });
  });
});

function filterTasks() {
  const filter = document.getElementById("priorityFilter").value;
  const items = document.querySelectorAll("#todoList li");

  items.forEach(item => {
    const priority = item.getAttribute("data-priority");
    if (filter === "All" || priority === filter) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}
