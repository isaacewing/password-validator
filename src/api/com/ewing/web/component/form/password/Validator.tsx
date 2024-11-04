import type { FormEvent, ReactElement } from 'react';
import { useState } from 'react';
import { AWeberLogo } from '../../../svg/logo';
import { ValidatorProps } from '../../../type';

export function Validator(props?: ValidatorProps): ReactElement {
    const DEFAULT_LENGTH = 6;
    const DEFAULT_LOWER = true;
    const DEFAULT_UPPER = true;
    const DEFAULT_NUMBER = true;
    const DEFAULT_SPECIAL = true;
    const config: ValidatorProps = {
        minLength: DEFAULT_LENGTH,
        reqLower: DEFAULT_LOWER,
        reqUpper: DEFAULT_UPPER,
        reqNum: DEFAULT_NUMBER,
        reqSpecial: DEFAULT_SPECIAL,
        ...props,
    };
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const validatePassword = () => {
        if (password.length < config.minLength) {
            return 'Password must be at least 6 characters long.';
        }
        if (config.reqUpper && !/[A-Z]/.test(password)) {
            return 'Password must contain at least one uppercase letter.';
        }
        if (config.reqLower && !/[a-z]/.test(password)) {
            return 'Password must contain at least one lowercase letter.';
        }
        if (config.reqNum && !/[0-9]/.test(password)) {
            return 'Password must contain at least one number.';
        }
        if (config.reqSpecial && !/[!@#$%^&*()_\-+={[}\]|:;"'<,>.]/.test(password)) {
            return 'Password must contain at least one special character.';
        }
        if (password !== confirmPassword) {
            return 'Passwords do not match.';
        }
        return ''; // No error
    };

    // Handle submit action
    const handleSubmit = (event: FormEvent): void => {
        event.preventDefault();
        const validationError = validatePassword();

        if (validationError) {
            setError(validationError);
            document.getElementById('password').focus();
        } else {
            setError('');
            alert('Password is valid and successfully submitted!');
        }
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <AWeberLogo fill="#246be8" className="mx-auto h-10 w-auto" />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 capitalize">password validator</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900 capitalize">password</label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    autoComplete="current-password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm/6 transition"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="confirmPassword" className="block text-sm/6 font-medium text-gray-900 capitalize">confirm password</label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    autoComplete="confirm-password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm/6 transition"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                                Check Passwords
                            </button>
                            {error && <div style={{ color: 'red' }}>{error}</div>}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
