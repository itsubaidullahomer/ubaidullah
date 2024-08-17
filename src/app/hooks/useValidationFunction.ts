import React from "react";

interface ValidationFunctions {
  validateData: (state: Record<string, any>) => Record<string, string>;
  getFirstErrorMessage: (errors: Record<string, string>) => string;
  isEmpty: (value: any) => boolean;
}

function useValidationFunction(): ValidationFunctions {
  function isEmpty(value: any): boolean {
    if (value === null || value === undefined) {
      return true;
    }
    if (typeof value === "string" && value.trim() === "") {
      return true;
    }
    if (Array.isArray(value) && value.length === 0) {
      return true;
    }
    if (typeof value === "object" && Object.keys(value).length === 0) {
      return true;
    }
    return false;
  }

  function getFirstErrorMessage(errors: Record<string, string>): string {
    for (const key in errors) {
      if (errors.hasOwnProperty(key)) {
        return errors[key];
      }
    }
    return "No errors found";
  }

  const validateData = (state: Record<string, any>): Record<string, string> => {
    let newErrors: Record<string, string> = {};
    for (const key in state) {
      if (state.hasOwnProperty(key)) {
        if (isEmpty(state[key])) {
          newErrors[key] = `${key} field is required`;
        } else if (key.toLowerCase().includes("email")) {
          if (!isValidEmail(state[key])) {
            newErrors[key] = `Invalid email format for ${key}`;
          }
        }
      }
    }
    return newErrors;
  };

  const isValidEmail = (email: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email.toLowerCase());
  };

  const getPasswordStrengthMessage = (password: string): string => {
    if (!password || password.length === 0) {
      return "Password is required";
    } else if (password.length < 8) {
      return "Password must be at least 8 characters long";
    } else {
      const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
      if (passwordPattern.test(password)) {
        return "Strong password";
      } else {
        const mediumPattern = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;
        if (mediumPattern.test(password)) {
          return "Medium password";
        } else {
          return "Weak password";
        }
      }
    }
  };

  return { validateData, getFirstErrorMessage, isEmpty };
}

export default useValidationFunction;
