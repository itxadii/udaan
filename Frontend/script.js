document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const searchTypeSelect = document.getElementById('searchType');
    const urbanFields = document.querySelector('.urban-fields');
    const ruralFields = document.querySelector('.rural-fields');
    const stateSelect = document.getElementById('state');
    const districtSelect = document.getElementById('district');
    const searchForm = document.getElementById('propertySearchForm');

    // Toggle property-specific fields based on search type
    searchTypeSelect.addEventListener('change', function() {
        if (this.value === 'urban') {
            urbanFields.style.display = 'block';
            ruralFields.style.display = 'none';
        } else if (this.value === 'rural') {
            urbanFields.style.display = 'none';
            ruralFields.style.display = 'block';
        }
    });

    // Populate states
    const states = [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
        'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 
        'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 
        'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
        'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 
        'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
        'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
        'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
    ];

    // Add states to select dropdown
    states.forEach(state => {
        const option = document.createElement('option');
        option.value = state.toLowerCase().replace(/\s+/g, '-');
        option.textContent = state;
        stateSelect.appendChild(option);
    });

    // Sample district data (would be replaced with actual API in production)
    const districtsByState = {
        'maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Aurangabad'],
        'karnataka': ['Bangalore', 'Mysore', 'Hubli', 'Mangalore', 'Belgaum'],
        'tamil-nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruchirapalli'],
        // Add more states and their districts as needed
    };

    // Update districts based on state selection
    stateSelect.addEventListener('change', function() {
        updateDistricts(this.value);
    });
    
    // Function to update districts dropdown
    function updateDistricts(selectedState) {
        try {
            // Clear existing options
            districtSelect.innerHTML = '<option value="" disabled selected>Select district</option>';
            
            const districts = districtsByState[selectedState] || [];
            
            if (districts.length === 0) {
                // Add a message if no districts are available
                const option = document.createElement('option');
                option.value = "";
                option.disabled = true;
                option.textContent = "No districts available for this state";
                districtSelect.appendChild(option);
            } else {
                districts.forEach(district => {
                    const option = document.createElement('option');
                    option.value = district.toLowerCase().replace(/\s+/g, '-');
                    option.textContent = district;
                    districtSelect.appendChild(option);
                });
            }
        } catch (error) {
            console.error('Error updating districts:', error);
            // Add a fallback option
            districtSelect.innerHTML = '<option value="" disabled selected>Error loading districts</option>';
        }
    }

    // Check for previously selected values (for back navigation)
    try {
        const searchParams = sessionStorage.getItem('searchParams');
        if (searchParams) {
            const params = JSON.parse(searchParams);
            
            // Restore search type
            if (params.searchType) {
                searchTypeSelect.value = params.searchType;
                // Trigger change event to show/hide appropriate fields
                const event = new Event('change');
                searchTypeSelect.dispatchEvent(event);
            }
            
            // Restore state and then districts
            if (params.state) {
                stateSelect.value = params.state;
                // Update districts based on selected state
                updateDistricts(params.state);
                
                // Restore district selection after districts are populated
                if (params.district) {
                    setTimeout(() => {
                        districtSelect.value = params.district;
                    }, 100);
                }
            }
            
            // Restore other form fields
            for (const key in params) {
                const input = document.getElementById(key);
                if (input && input !== searchTypeSelect && input !== stateSelect && input !== districtSelect) {
                    input.value = params[key];
                }
            }
        }
    } catch (error) {
        console.error('Error restoring form state:', error);
        // Continue without restoring - don't block the user
    }

    // Form submission handler
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate required fields
        const requiredFields = ['state', 'district'];
        let isValid = true;
        
        requiredFields.forEach(field => {
            const input = document.getElementById(field);
            if (!input.value) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        
        if (!isValid) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Collect form data
        const formData = new FormData(this);
        const searchData = {};
        
        for (const [key, value] of formData.entries()) {
            searchData[key] = value;
        }
        
        // Store form data in sessionStorage for back navigation
        sessionStorage.setItem('searchParams', JSON.stringify(searchData));
        
        // Send data to backend API
        fetch('http://localhost:3000/api/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(searchData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Store results in sessionStorage for results page
            sessionStorage.setItem('searchResults', JSON.stringify(data));
            
            // Redirect to results page
            window.location.href = 'results.html';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was a problem with your search. Please try again.');
        });
    });
});