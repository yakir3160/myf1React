import React, { useState } from 'react';
import Input from '../Reusables/Input';
import { registerSchema, checkPasswordStrength } from '../../validation/authSchemas';
import * as Yup from 'yup';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        city: '',
        age: ''
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    // טיפול בשינויים בטופס
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        
        // מסיר את השגיאה כאשר המשתמש מתחיל להקליד
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: undefined
            });
        }

        // טיפול מיוחד בסיסמה - בדיקת חוזק
        if (name === 'password' && value) {
            const { strength, feedback } = checkPasswordStrength(value);
            
            setErrors(prev => ({
                ...prev,
                passwordStrength: feedback
            }));
            
            // אם שונתה הסיסמה, בדוק גם את אישור הסיסמה
            if (formData.confirmPassword) {
                validateField('confirmPassword', formData.confirmPassword, { validateEmptyValue: true });
            }
        }
    };

    // וולידציה של שדה בודד
    const validateField = async (name, value, options = {}) => {
        const { validateEmptyValue = false } = options;
        
        // אם השדה ריק ולא נדרש לבדוק שדות ריקים, אל תציג שגיאה
        if (!value && !validateEmptyValue) {
            return;
        }

        try {
            // בדיקה של שדה ספציפי
            await Yup.reach(registerSchema, name).validate(value);
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
            
        } catch (error) {
            setErrors(prev => ({
                ...prev,
                [name]: error.message
            }));
        }
    };

    // וולידציה בזמן יציאה משדה
    const handleBlur = (e) => {
        const { name, value } = e.target;
        
        // בדיקה שהמשתמש באמת הזין תוכן בשדה לפני הצגת שגיאות
        if (value.trim() || name === 'email' || name === 'password' || 
            name === 'confirmPassword' || name === 'age') {
            validateField(name, value, { validateEmptyValue: true });
        }
    };

    // וולידציה של כל הטופס
    const validateForm = async () => {
        try {
            // וולידציה באמצעות yup
            await registerSchema.validate(formData, { abortEarly: false });
            return {}; // אין שגיאות וולידציה
        } catch (yupError) {
            // המרת שגיאות Yup לפורמט המתאים עבור הטופס
            const validationErrors = {};
            if (yupError.inner) {
                yupError.inner.forEach(error => {
                    validationErrors[error.path] = error.message;
                });
            }
            return validationErrors;
        }
    };

    // טיפול בשליחת הטופס
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitSuccess(false);
        
        try {
            const newErrors = await validateForm();
            
            if (Object.keys(newErrors).length === 0) {
                // סימולציה של שליחת נתונים לשרת
                await new Promise(resolve => setTimeout(resolve, 800));
                
                // טופס תקין - כאן בדרך כלל היית מבצע קריאת API
                setSubmitSuccess(true);
                console.log('נתוני ההרשמה:', formData);
                
                // איפוס השדות לאחר שליחה מוצלחת
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    city: '',
                    age: ''
                });
                
                // איפוס השגיאות
                setErrors({});
                
                // הצגת הודעת הצלחה למשך 3 שניות
                setTimeout(() => {
                    setSubmitSuccess(false);
                }, 3000);
                
            } else {
                // הצגת שגיאות וולידציה
                setErrors(newErrors);
                
                // מיקוד על השדה הראשון עם שגיאה
                const firstErrorField = Object.keys(newErrors)[0];
                const errorElement = document.getElementById(firstErrorField);
                if (errorElement) {
                    errorElement.focus();
                }
            }
        } catch (error) {
            console.error('שגיאה בתהליך הוולידציה:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // מייצרים אייקונים עבור השדות השונים
    const nameIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
    );
    
    const emailIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
    );
    
    const passwordIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
    );
    
    const cityIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
    );
    
    const ageIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 3a1 1 0 011-1h.01a1 1 0 010 2H7a1 1 0 01-1-1zm2 3a1 1 0 00-2 0v1a2 2 0 00-2 2v1a2 2 0 002 2h6a2 2 0 002-2v-1a2 2 0 00-2-2V6a1 1 0 10-2 0v1H8V6zm10 8a1 1 0 01-1 1H3a1 1 0 110-2h14a1 1 0 011 1z" clipRule="evenodd" />
        </svg>
    );

    // הגדרת צבע חוזק סיסמה
    const getPasswordStrengthColor = () => {
        const passwordStrength = errors.passwordStrength;
        
        if (!passwordStrength) return '';
        if (passwordStrength === 'סיסמה חלשה') return 'text-red-500';
        if (passwordStrength === 'סיסמה בינונית') return 'text-yellow-500';
        return 'text-green-500';
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 text-right" dir="rtl">
            <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                label="שם מלא"
                placeholder="הזן שם מלא"
                error={errors.name}
                icon={nameIcon}
            />
            
            <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                label="אימייל"
                placeholder="הזן אימייל"
                error={errors.email}
                icon={emailIcon}
                dir="ltr"
            />
            
            <div>
                <Input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="סיסמה"
                    placeholder="הזן סיסמה"
                    error={errors.password}
                    icon={passwordIcon}
                    hasToggleButton={true}
                    isToggled={showPassword}
                    onToggle={() => setShowPassword(!showPassword)}
                />
                
                {formData.password && errors.passwordStrength && (
                    <p className={`text-sm mt-1 ${getPasswordStrengthColor()}`}>
                        {errors.passwordStrength}
                    </p>
                )}
            </div>
            
            <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                label="אימות סיסמה"
                placeholder="הזן את הסיסמה בשנית"
                error={errors.confirmPassword}
                icon={passwordIcon}
                hasToggleButton={true}
                isToggled={showConfirmPassword}
                onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
            />
            
            <Input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                onBlur={handleBlur}
                label="עיר מגורים"
                placeholder="הזן עיר מגורים"
                error={errors.city}
                icon={cityIcon}
            />
            
            <Input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                onBlur={handleBlur}
                label="גיל"
                placeholder="הזן גיל"
                error={errors.age}
                icon={ageIcon}
                min="16"
                max="120"
            />
            
            <button 
                type="submit" 
                className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-300 text-lg font-medium"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'נרשם...' : 'הירשם'}
            </button>
            
            {submitSuccess && (
                <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">ההרשמה בוצעה בהצלחה!</strong>
                </div>
            )}
        </form>
    );
};

export default RegisterForm;
