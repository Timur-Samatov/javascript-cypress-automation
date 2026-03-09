export const ParabankApiClient = {
    /**
     * Registers a new user with the ParaBank API.
     * @param {boolean} stayLoggedIn - If true, the user will remain logged in after registration.
     * @param {boolean} uniqueSuffix - If true, a unique suffix will be added to the username and password.
     * @returns {object} The customer object.
     */
    registerNewUser({ stayLoggedIn = true, uniqueSuffix = true }) {
        const customer = {};
        cy.env(['userData']).then(({ userData }) => {
            return cy.request({
                url: '/parabank/register.htm',
            }).then(() => {
                const timestamp = Date.now();
                customer.firstName = (uniqueSuffix) ? userData.firstName + timestamp : userData.firstName;
                customer.lastName = (uniqueSuffix) ? userData.lastName + timestamp : userData.lastName;
                customer.address = {
                    street: "TestStreet",
                    city: "TestCity",
                    state: "TestState",
                    zipCode: "12345"
                };
                customer.username = (uniqueSuffix) ? userData.userName + timestamp : userData.userName;
                customer.password = userData.password;
                customer.phoneNumber = "5551234567";
                customer.ssn = "11111111";
                customer.fullName = customer.firstName + ' ' + customer.lastName;

                const body = new URLSearchParams();
                body.append('customer.firstName', customer.firstName);
                body.append('customer.lastName', customer.lastName);
                body.append('customer.address.street', customer.address.street);
                body.append('customer.address.city', customer.address.city);
                body.append('customer.address.state', customer.address.state);
                body.append('customer.address.zipCode', customer.address.zipCode);
                body.append('customer.phoneNumber', customer.phoneNumber);
                body.append('customer.ssn', customer.ssn);
                body.append('customer.username', customer.username);
                body.append('customer.password', customer.password);
                body.append('repeatedPassword', customer.password);

                cy.request({
                    method: 'POST',
                    url: '/parabank/register.htm',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    form: true,
                    body: Object.fromEntries(body)
                }).then(() => {
                    this.getCustomerId(customer.username, customer.password)
                        .then((id) => {
                            customer.id = id;
                        })
                })

                if (!stayLoggedIn) {
                    cy.clearCookies()
                }
            })
        })
        return customer;
    },

    authenticatedHeaders(username, password) {
        return {
            "Authorization": "Basic " + btoa(username + ":" + password),
            "Accept": "application/json"
        }
    },
    getCustomerId(username, password) {
        return cy.request({
            method: 'GET',
            url: `/parabank/services/bank/login/${username}/${password}`,
            headers: this.authenticatedHeaders(username, password)
        }).then((response) => {
            return response.body.id;
        })
    }
}