function validateUserInput({ email, name, password }: { email: string, name?: string, password: string }) {
    let errors = {
        email: '',
        name: '',
        password: ''
    };

    if (!email) {
        errors.email = "Email can't be empty"
    }

    if (!name) {
        errors.name = "Username can't be empty"
    }

    if (!password) {
        errors.password = "Email can't be empty"
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errors.email = 'Invalid email format.';
    }

    if (name && name.length < 3) {
        errors.name = 'Name should be at least 3 characters long.';
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        errors.password = 'Password should be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.';
    }
    if (errors.email === '' && errors.name === '' && errors.password === '') {
        return null;
    }

    return errors;
}


export default validateUserInput


