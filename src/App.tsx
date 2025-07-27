// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import { AuthProvider } from "@/context/authContext";
import ProtectedRoute from "@/components/ProtectedRoute";

import Index from "@/pages/Index";
import LoginPage from "@/pages/LoginPage";
import SignUpPage from "@/pages/SignUpPage";
import AdminLoginPage from "@/pages/AdminLoginPage";
import AdminRegisterPage from "@/pages/AdminRegisterPage";
import UserDashboard from "@/pages/UserDashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />

            {/* User Auth */}
            <Route
              path="/login"
              element={
                <ProtectedRoute requireAuth={false} userType="user">
                  <LoginPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <ProtectedRoute requireAuth={false} userType="user">
                  <SignUpPage />
                </ProtectedRoute>
              }
            />

            {/* Admin Auth */}
            <Route
              path="/admin/login"
              element={
                <ProtectedRoute requireAuth={false} userType="admin">
                  <AdminLoginPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/register"
              element={
                <ProtectedRoute requireAuth={false} userType="admin">
                  <AdminRegisterPage />
                </ProtectedRoute>
              }
            />

            {/* Protected Dashboards */}
            <Route
              path="/user/dashboard"
              element={
                <ProtectedRoute requireAuth={true} userType="user">
                  <UserDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute requireAuth={true} userType="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
