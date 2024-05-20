import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { login, register } from './api/userApi';
import { Router } from '../../../app';

export function Login() {
  const loginMutation = useMutation({
    mutationFn: login,
  });

  const registerMutation = useMutation({
    mutationFn: register,
  });

  const onSubmitLogin = (event: React.FormEvent<{ name: string }>) => {
    event.preventDefault();
    loginMutation.mutate({ name: event.target.name.value });
  };

  const onSubmitRegister = (event: React.FormEvent<{ name: string }>) => {
    event.preventDefault();
    registerMutation.mutate({ name: event.target.name.value });
  };

  if (loginMutation.isSuccess || registerMutation.isSuccess) {
    localStorage.setItem(
      'token',
      loginMutation.isSuccess
        ? loginMutation.data.token
        : registerMutation.data.token
    );
    Router.push('Room');
  }
  return (
    <div>
      login
      <form onSubmit={onSubmitLogin}>
        <input type="text" name="name" />
        <button>Login</button>
      </form>
      <br />
      Or create account
      <form onSubmit={onSubmitRegister}>
        <input type="text" name="name" />
        <button>Create account</button>
      </form>
    </div>
  );
}
