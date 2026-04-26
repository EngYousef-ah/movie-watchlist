import { toast } from 'react-hot-toast';

export const Toast = {
  promise: (promise, messages) => {
    return toast.promise(
      promise,
      {
        loading: messages.loading ,
        success: messages.success ,
        error: messages.error ,
      },
      {
        success: {
          duration: 3000,
          iconTheme: { primary: '#000000', secondary: '#ffffff' },
          style: {
            background: '#ffffff', 
            color: '#000000',
            border: '1px solid #3f3f46',
            borderRadius: '10px',
            padding: '12px 20px',
            fontSize: '14px',
            fontWeight: '500',
          },
        },
        error: {
          iconTheme: { primary: '#ef4444', secondary: '#ffffff' },
          style: {
            background: '#18181b',
            color: '#f87171',
            border: '1px solid #ef4444',
            borderRadius: '10px',
          },
        },
      }
    );
  }
};