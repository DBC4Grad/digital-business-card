'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';

export default function EditCard({ setEditCard }: { setEditCard: (value: boolean) => void }) {
  const router = useRouter();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    position: '',
    email: '',
    phoneContact: '',
    officeContact: '',
    profileImageFile: null as File | null,
  });
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchPersonalData = async () => {
      if (user) {
        try {
          const response = await fetch(`http://localhost:8080/api/users/username/${user.username}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (response.ok) {
            const data = await response.json();
            if (data.personal) {
              setFormData({
                firstName: data.personal.firstName || '',
                lastName: data.personal.lastName || '',
                company: data.personal.company || '',
                position: data.personal.position || '',
                email: data.personal.email || '',
                phoneContact: data.personal.phoneContact || '',
                officeContact: data.personal.officeContact || '',
                profileImageFile: null,
              });
            }
          } else {
            console.error('Failed to fetch personal data');
          }
        } catch (error) {
          console.error('Error fetching personal data:', error);
        }
      }
    };

    fetchPersonalData();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'profileImageFile' && files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        form.append(key, value as string | Blob);
      }
    });

    try {
      const response = await fetch('http://localhost:8080/personal/edit', {
        method: 'POST',
        body: form,
        credentials: 'include', // Include session cookies
      });

      if (response.ok) {
        router.push('/home'); // Redirect to home page after successful update
      } else {
        const error = await response.text();
        setMessage(`Error: ${error}`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage('An unknown error occurred.');
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 p-6 bg-[#e8f2dd] rounded-lg pb-40">
      <h2 className="text-center text-2xl font-bold mb-6 text-[#6a8d5d]">Edit Personal Card</h2>
      {message && <p className="text-center text-red-500 mb-4">{message}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label htmlFor="firstName" className="block mb-2 font-medium text-[#6a8d5d]">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#a0b58b]"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block mb-2 font-medium text-[#6a8d5d]">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#a0b58b]"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="company" className="block mb-2 font-medium text-[#6a8d5d]">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#a0b58b]"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="position" className="block mb-2 font-medium text-[#6a8d5d]">
            Position
          </label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#a0b58b]"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-medium text-[#6a8d5d]">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#a0b58b]"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phoneContact" className="block mb-2 font-medium text-[#6a8d5d]">
            Personal Contact
          </label>
          <input
            type="text"
            id="phoneContact"
            name="phoneContact"
            value={formData.phoneContact}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#a0b58b]"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="officeContact" className="block mb-2 font-medium text-[#6a8d5d]">
            Office Contact
          </label>
          <input
            type="text"
            id="officeContact"
            name="officeContact"
            value={formData.officeContact}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#a0b58b]"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="profileImageFile" className="block mb-2 font-medium text-[#6a8d5d]">
            Profile Image
          </label>
          <input
            type="file"
            id="profileImageFile"
            name="profileImageFile"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#a0b58b]"
          />
        </div>
        <button type="submit" className="w-full py-2 bg-[#6a8d5d] text-white rounded-md hover:bg-[#5a7d4d] transition">
          Save Changes
        </button>
      </form>
      <button
        onClick={() => setEditCard(false)}
        className="mt-4 w-full py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
      >
        Back
      </button>
    </div>
  );
}
