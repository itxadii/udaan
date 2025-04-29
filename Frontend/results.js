document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const searchSummary = document.getElementById('searchSummary');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const resultsGrid = document.getElementById('resultsGrid');
    const noResults = document.getElementById('noResults');
    
    // Get search results and parameters from sessionStorage
    const searchResults = JSON.parse(sessionStorage.getItem('searchResults') || '{"results":[]}');
    const searchParams = JSON.parse(sessionStorage.getItem('searchParams') || '{}');
    
    // Display search summary
    displaySearchSummary(searchParams);
    
    // Hide loading indicator
    loadingIndicator.style.display = 'none';
    
    // Display results or no results message
    if (searchResults.results && searchResults.results.length > 0) {
        displayResults(searchResults.results);
    } else {
        noResults.style.display = 'block';
    }
    
    /**
     * Display search summary
     * @param {Object} params - Search parameters
     */
    function displaySearchSummary(params) {
        let summaryHTML = '<h4>Search Parameters</h4><ul>';
        
        if (params.searchType) {
            summaryHTML += `<li><strong>Property Type:</strong> ${params.searchType === 'urban' ? 'Urban Property' : 'Rural Property'}</li>`;
        }
        
        if (params.ownerName) {
            summaryHTML += `<li><strong>Owner Name:</strong> ${params.ownerName}</li>`;
        }
        
        if (params.state) {
            const stateName = document.querySelector(`#state option[value="${params.state}"]`)?.textContent || params.state;
            summaryHTML += `<li><strong>State:</strong> ${stateName}</li>`;
        }
        
        if (params.district) {
            const districtName = document.querySelector(`#district option[value="${params.district}"]`)?.textContent || params.district;
            summaryHTML += `<li><strong>District:</strong> ${districtName}</li>`;
        }
        
        if (params.municipalityType) {
            summaryHTML += `<li><strong>Municipality Type:</strong> ${params.municipalityType}</li>`;
        }
        
        if (params.wardNumber) {
            summaryHTML += `<li><strong>Ward Number:</strong> ${params.wardNumber}</li>`;
        }
        
        summaryHTML += '</ul>';
        searchSummary.innerHTML = summaryHTML;
    }
    
    /**
     * Display search results
     * @param {Array} results - Search results
     */
    function displayResults(results) {
        resultsGrid.innerHTML = '';
        
        results.forEach((result, index) => {
            const resultCard = document.createElement('div');
            resultCard.className = 'result-card';
            resultCard.style.animationDelay = `${0.1 * index}s`;
            
            // Determine source class
            const sourceClass = result.source ? result.source.toLowerCase() : 'doris';
            
            let cardHTML = `
                <div class="result-source ${sourceClass}">${result.source || 'DORIS'}</div>
                <h3 class="result-title">${result.id || 'Property Record'}</h3>
            `;
            
            // Add owner details if available
            if (result.ownerName) {
                cardHTML += `
                    <div class="result-detail">
                        <strong>Owner:</strong> ${result.ownerName}
                    </div>
                `;
            }
            
            // Add address if available
            if (result.address) {
                cardHTML += `
                    <div class="result-detail">
                        <strong>Address:</strong> ${result.address}
                    </div>
                `;
            }
            
            // Add property type if available
            if (result.propertyType) {
                cardHTML += `
                    <div class="result-detail">
                        <strong>Type:</strong> ${result.propertyType === 'urban' ? 'Urban' : 'Rural'}
                    </div>
                `;
            }
            
            // Add area if available
            if (result.area) {
                cardHTML += `
                    <div class="result-detail">
                        <strong>Area:</strong> ${result.area}
                    </div>
                `;
            }
            
            // Add market value if available
            if (result.marketValue) {
                cardHTML += `
                    <div class="result-detail">
                        <strong>Value:</strong> ${result.marketValue}
                    </div>
                `;
            }
            
            // Add view more button with icon
            cardHTML += `
                <button class="view-more-btn interactive-element" data-id="${result.id}">
                    <span>View Details</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M7 7l10 10M17 7v10H7"></path>
                    </svg>
                </button>
            `;
            
            resultCard.innerHTML = cardHTML;
            resultsGrid.appendChild(resultCard);
            
            // Add event listener to view more button
            resultCard.querySelector('.view-more-btn').addEventListener('click', function() {
                showDetailView(result);
            });
        });
    }
    
    /**
     * Show detailed view of a property
     * @param {Object} property - Property details
     */
    function showDetailView(property) {
        // Create the detail view if it doesn't exist
        let detailViewElement = document.getElementById('detailView');
        
        if (!detailViewElement) {
            detailViewElement = document.createElement('div');
            detailViewElement.id = 'detailView';
            detailViewElement.className = 'detail-view';
            document.querySelector('main').appendChild(detailViewElement);
        }
        
        // Determine source class
        const sourceClass = property.source ? property.source.toLowerCase() : 'doris';
        
        // Create HTML for the detail view
        let detailHTML = `
            <div class="detail-header">
                <h2>${property.id || 'Property Details'}</h2>
                <button class="close-btn" aria-label="Close">&times;</button>
            </div>
            <div class="detail-content">
                <div class="detail-source ${sourceClass}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="16"></line>
                        <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                    Source: ${property.source || 'DORIS'}
                </div>
                
                <div class="detail-section">
                    <h3>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                        Basic Information
                    </h3>
                    <div class="detail-card">
                        <table class="detail-table">
                            <tr>
                                <th>Owner Name</th>
                                <td>${property.ownerName || 'Not available'}</td>
                            </tr>
                            <tr>
                                <th>Address</th>
                                <td>${property.address || 'Not available'}</td>
                            </tr>
                            <tr>
                                <th>Property Type</th>
                                <td>${property.propertyType ? (property.propertyType === 'urban' ? 'Urban' : 'Rural') : 'Not available'}</td>
                            </tr>
                            <tr>
                                <th>Area</th>
                                <td>${property.area || 'Not available'}</td>
                            </tr>
                            <tr>
                                <th>Market Value</th>
                                <td>${property.marketValue || 'Not available'}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                
                <div class="detail-section">
                    <h3>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        Registration Details
                    </h3>
                    <div class="detail-card">
                        <table class="detail-table">
                            <tr>
                                <th>Registration Number</th>
                                <td>${property.registrationNumber || 'Not available'}</td>
                            </tr>
                            <tr>
                                <th>Registration Date</th>
                                <td>${property.registrationDate || 'Not available'}</td>
                            </tr>
                            <tr>
                                <th>Registration Office</th>
                                <td>${property.registrationOffice || 'Not available'}</td>
                            </tr>
                        </table>
                    </div>
                </div>
        `;
        
        // Add encumbrances section if available
        if (property.encumbrances && property.encumbrances.length > 0) {
            detailHTML += `
                <div class="detail-section">
                    <h3>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                            <path d="M2 17l10 5 10-5"></path>
                            <path d="M2 12l10 5 10-5"></path>
                        </svg>
                        Encumbrances
                    </h3>
                    <div class="detail-card">
                        <table class="detail-table">
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Holder</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
            `;
            
            property.encumbrances.forEach(encumbrance => {
                detailHTML += `
                    <tr>
                        <td>${encumbrance.type || 'Not specified'}</td>
                        <td>${encumbrance.holder || 'Not specified'}</td>
                        <td>${encumbrance.amount || 'Not specified'}</td>
                        <td>${encumbrance.date || 'Not specified'}</td>
                    </tr>
                `;
            });
            
            detailHTML += `
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        } else {
            detailHTML += `
                <div class="detail-section">
                    <h3>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                            <path d="M2 17l10 5 10-5"></path>
                            <path d="M2 12l10 5 10-5"></path>
                        </svg>
                        Encumbrances
                    </h3>
                    <div class="detail-card">
                        <p class="no-data-message">No encumbrances found for this property.</p>
                    </div>
                </div>
            `;
        }
        
        // Add additional details if available
        detailHTML += `
            <div class="detail-section">
                <h3>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                    Additional Details
                </h3>
                <div class="detail-card">
                    <table class="detail-table">
        `;
        
        // Add property tax if available
        if (property.propertyTax) {
            detailHTML += `
                <tr>
                    <th>Property Tax</th>
                    <td>${property.propertyTax}</td>
                </tr>
            `;
        }
        
        // Add last transaction date if available
        if (property.lastTransactionDate) {
            detailHTML += `
                <tr>
                    <th>Last Transaction Date</th>
                    <td>${property.lastTransactionDate}</td>
                </tr>
            `;
        }
        
        // Add document type if available
        if (property.documentType) {
            detailHTML += `
                <tr>
                    <th>Document Type</th>
                    <td>${property.documentType}</td>
                </tr>
            `;
        }
        
        // Add execution date if available
        if (property.executionDate) {
            detailHTML += `
                <tr>
                    <th>Execution Date</th>
                    <td>${property.executionDate}</td>
                </tr>
            `;
        }
        
        // Add property description if available
        if (property.propertyDescription) {
            detailHTML += `
                <tr>
                    <th>Property Description</th>
                    <td>${property.propertyDescription}</td>
                </tr>
            `;
        }
        
        detailHTML += `
                    </table>
                </div>
            </div>
            </div>
        `;
        
        // Set the HTML content
        detailViewElement.innerHTML = detailHTML;
        
        // Show the detail view with animation
        detailViewElement.style.display = 'block';
        setTimeout(() => {
            detailViewElement.classList.add('active');
        }, 10);
        
        // Add event listener to close button
        detailViewElement.querySelector('.close-btn').addEventListener('click', function() {
            closeDetailView();
        });
        
        // Close detail view when pressing Escape key
        document.addEventListener('keydown', function escKeyHandler(event) {
            if (event.key === 'Escape') {
                closeDetailView();
                document.removeEventListener('keydown', escKeyHandler);
            }
        });
        
        // Close detail view when clicking outside
        document.addEventListener('click', function outsideClickHandler(event) {
            if (detailViewElement.style.display === 'block' && 
                !detailViewElement.contains(event.target) && 
                !event.target.classList.contains('view-more-btn')) {
                closeDetailView();
                document.removeEventListener('click', outsideClickHandler);
            }
        });
        
        // Function to close detail view with animation
        function closeDetailView() {
            detailViewElement.classList.remove('active');
            setTimeout(() => {
                detailViewElement.style.display = 'none';
            }, 300);
        }
    }
});