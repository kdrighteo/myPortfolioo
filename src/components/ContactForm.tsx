'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const ContactForm = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset status
    setFormStatus('submitting');
    setErrorMessage('');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }
      
      // Success
      setFormStatus('success');
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      // Reset form status after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-secondary-800 p-8 rounded-lg shadow-md">
      {formStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-md"
        >
          <p className="font-medium">Your message has been sent successfully!</p>
          <p className="text-sm mt-1">Thank you for reaching out. I will get back to you as soon as possible.</p>
        </motion.div>
      )}
      
      {formStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-md"
        >
          <p className="font-medium">Failed to send message</p>
          <p className="text-sm mt-1">{errorMessage || 'Please try again later.'}</p>
        </motion.div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
            Name*
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-secondary-300 dark:border-secondary-700 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-secondary-900 dark:text-white"
            required
            disabled={formStatus === 'submitting'}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
            Email*
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-secondary-300 dark:border-secondary-700 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-secondary-900 dark:text-white"
            required
            disabled={formStatus === 'submitting'}
          />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-secondary-300 dark:border-secondary-700 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-secondary-900 dark:text-white"
          disabled={formStatus === 'submitting'}
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
          Message*
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-secondary-300 dark:border-secondary-700 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-secondary-900 dark:text-white"
          required
          disabled={formStatus === 'submitting'}
        ></textarea>
      </div>
      <div>
        <button
          type="submit"
          className="w-full btn btn-primary flex justify-center items-center"
          disabled={formStatus === 'submitting'}
        >
          {formStatus === 'submitting' ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
