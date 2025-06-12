import React, { useState } from 'react';
import Input from '../Reusables/Input';
import { loginSchema } from '../../validation/authSchemas';
import * as Yup from 'yup';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
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
            await Yup.reach(loginSchema, name).validate(value);
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
        if (value.trim() || name === 'email' || name === 'password') {
            validateField(name, value, { validateEmptyValue: true });
        }
    };

    // וולידציה של כל הטופס
    const validateForm = async () => {
        try {
            // וולידציה באמצעות yup
            await loginSchema.validate(formData, { abortEarly: false });
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
                console.log('נתוני ההתחברות:', formData);
                
                // איפוס השדות לאחר שליחה מוצלחת
                setFormData({
                    email: '',
                    password: ''
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
    
    // מייצרים אייקון עבור שדה האימייל
    const emailIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
    );

    // מייצרים אייקון עבור שדה הסיסמה
    const passwordIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
    );

    return (
        <form onSubmit={handleSubmit} className="space-y-4 text-right" dir="rtl">
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
            
            <button 
                type="submit" 
                className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-300 text-lg font-medium"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'מתחבר...' : 'התחבר'}
            </button>
            
            <div className="mt-4 text-center">
                <a href="#" className="text-red-600 hover:underline text-sm">שכחתי סיסמה</a>
            </div>
            
            {submitSuccess && (
                <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">התחברות בוצעה בהצלחה!</strong>
                </div>
            )}
        </form>
    );
};

export default LoginForm;
