
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import { ArrowRight, ShieldCheck, Clock, FileText } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="outline">Sign in</Button>
            </Link>
            <Link to="/register">
              <Button className="medifile-btn-primary">Register</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-medical-primary to-medical-dark text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Modern Healthcare File Management
            </h1>
            <p className="text-xl opacity-90 mb-8">
               Medifile transforms how healthcare facilities manage patient records with a secure, efficient electronic file system.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register">
                <Button className="bg-white text-medical-primary hover:bg-gray-100 px-6 py-5 rounded-md font-medium">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="bg-white text-medical-primary hover:bg-gray-100 px-6 py-5 rounded-md font-medium">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Medifile?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform offers everything healthcare facilities need to manage patient records efficiently and securely.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <div className="h-12 w-12 bg-medical-accent rounded-lg flex items-center justify-center mb-6">
                <ShieldCheck className="h-7 w-7 text-medical-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Secure & Compliant</h3>
              <p className="text-gray-600">
                Built with security and privacy regulations in mind, keeping sensitive patient data protected at all times.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <div className="h-12 w-12 bg-medical-accent rounded-lg flex items-center justify-center mb-6">
                <Clock className="h-7 w-7 text-medical-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Time-Saving</h3>
              <p className="text-gray-600">
                Quick access to patient records allows healthcare providers to focus more on patient care and less on paperwork.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <div className="h-12 w-12 bg-medical-accent rounded-lg flex items-center justify-center mb-6">
                <FileText className="h-7 w-7 text-medical-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Comprehensive Records</h3>
              <p className="text-gray-600">
                Store and manage all types of patient records in one central location, accessible to authorized personnel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-medical-accent">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Healthcare Facility?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Join healthcare facilities that are already benefiting from Medifile's electronic file management system.
          </p>
          <Link to="/register">
            <Button className="medifile-btn-primary px-8 py-6 text-lg">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Logo className="text-white mb-4" />
              <p className="text-gray-400">
                Modern electronic file management for healthcare facilities.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="https://innovatesa.tech" className="text-gray-400 hover:text-white">InnovateSA</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">Connect</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Twitter</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">LinkedIn</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Facebook</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>© 2025 InnovateSA Medifile. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
