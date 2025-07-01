"use client"

import { useState, useEffect } from "react"
import {
  Menu,
  X,
  Download,
  Shield,
  Zap,
  MessageCircle,
  Filter,
  Camera,
  Music,
  Palette,
  Users,
  ChevronRight,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Star,
  ChevronDown,
  ChevronUp,
  Send,
  Award,
  TrendingUp,
  Globe,
  Headphones,
} from "lucide-react"

// Add this right after the imports and before the useCountUp hook
const SafeComponent = ({ children }) => {
  try {
    return children
  } catch (error) {
    console.error("Component error:", error)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading...</h2>
          <p className="text-gray-600">Please wait while we prepare your experience.</p>
        </div>
      </div>
    )
  }
}

// Simplified counting animation hook that doesn't use useRef
const useCountUp = (end, duration = 2000, shouldStart = false) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!shouldStart) {
      setCount(0)
      return
    }

    let startTime = null
    let animationFrame = null

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      if (typeof end === "string" && end.includes("★")) {
        const numValue = Number.parseFloat(end)
        setCount(numValue * progress)
      } else if (typeof end === "string" && end.includes("+")) {
        const numValue = Number.parseInt(end.replace(/[^\d]/g, ""))
        setCount(Math.floor(numValue * progress))
      } else {
        setCount(Math.floor(end * progress))
      }

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [end, duration, shouldStart])

  return count
}

export default function SaralEventsLanding() {
  const [isClient, setIsClient] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    phone: "",
    category: "",
  })
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isContactSubmitting, setIsContactSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const [contactMessage, setContactMessage] = useState("")
  const [activeSection, setActiveSection] = useState("")
  const [openFAQ, setOpenFAQ] = useState(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  // Pre-define all count hooks to maintain consistent hook order
  const count1 = useCountUp(5000, 2000, hasAnimated)
  const count2 = useCountUp(20, 2000, hasAnimated)
  const count3 = useCountUp(10000, 2000, hasAnimated)
  const count4 = useCountUp(4.8, 2000, hasAnimated)

  // Ensure client-side rendering
  useEffect(() => {
    try {
      setIsClient(true)
    } catch (error) {
      console.error("Client detection error:", error)
      // Fallback - assume client after timeout
      setTimeout(() => setIsClient(true), 100)
    }
  }, [])

  // Add intersection observer for stats animation
  useEffect(() => {
    if (!isClient) return

    try {
      const observer = new IntersectionObserver(
        (entries) => {
          try {
            entries.forEach((entry) => {
              if (entry.isIntersecting && !hasAnimated) {
                setHasAnimated(true)
              }
            })
          } catch (error) {
            console.error("Observer callback error:", error)
          }
        },
        { threshold: 0.5 },
      )

      const statsSection = document.getElementById("stats")
      if (statsSection) {
        observer.observe(statsSection)
      }

      return () => {
        try {
          observer.disconnect()
        } catch (error) {
          console.error("Observer cleanup error:", error)
        }
      }
    } catch (error) {
      console.error("Intersection observer error:", error)
    }
  }, [hasAnimated, isClient])

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    if (!isClient) return
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMenuOpen(false)
    }
  }

  // Handle scroll to highlight active section
  useEffect(() => {
    if (!isClient) return

    const handleScroll = () => {
      try {
        const sections = ["hero", "features", "categories", "stats", "faq", "contact", "vendor-registration"]
        const scrollPosition = window.scrollY + 100

        for (const section of sections) {
          const element = document.getElementById(section)
          if (element) {
            const { offsetTop, offsetHeight } = element
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(section)
              break
            }
          }
        }
      } catch (error) {
        console.error("Scroll handler error:", error)
      }
    }

    try {
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    } catch (error) {
      console.error("Scroll listener error:", error)
    }
  }, [isClient])

  // Handle phone call
  const handlePhoneCall = (number) => {
    if (!isClient) return
    window.location.href = `tel:${number}`
  }

  // Handle email
  const handleEmail = (email) => {
    if (!isClient) return
    window.location.href = `mailto:${email}`
  }

  // Handle app download
  const handleAppDownload = (platform) => {
    if (!isClient) return
    if (platform === "ios") {
      window.open("https://apps.apple.com/app/saral-events", "_blank")
    } else if (platform === "android") {
      window.open("https://play.google.com/store/apps/details?id=com.saralevents", "_blank")
    }
  }

  // Handle QR code scan simulation
  const handleQRScan = () => {
    if (!isClient) return
    alert("QR Code scanned! Redirecting to app store...")
    const userAgent = navigator.userAgent || navigator.vendor || window.opera
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      handleAppDownload("ios")
    } else {
      handleAppDownload("android")
    }
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle contact form input changes
  const handleContactInputChange = (e) => {
    const { name, value } = e.target
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle vendor registration form submission
  const handleVendorSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (!formData.businessName || !formData.email || !formData.phone || !formData.category) {
      setSubmitMessage("Please fill in all fields")
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch("/api/vendor-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitMessage("Registration successful! We'll contact you within 24 hours.")
        setFormData({ businessName: "", email: "", phone: "", category: "" })
      } else {
        setSubmitMessage(result.error || "Registration failed. Please try again.")
      }
    } catch (error) {
      setSubmitMessage("Registration failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle contact form submission
  const handleContactSubmit = async (e) => {
    e.preventDefault()
    setIsContactSubmitting(true)

    if (!contactForm.name || !contactForm.email || !contactForm.phone || !contactForm.message) {
      setContactMessage("Please fill in all fields")
      setIsContactSubmitting(false)
      return
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactForm),
      })

      const result = await response.json()

      if (response.ok) {
        setContactMessage("Message sent successfully! We'll get back to you soon.")
        setContactForm({ name: "", email: "", phone: "", message: "" })
      } else {
        setContactMessage(result.error || "Failed to send message. Please try again.")
      }
    } catch (error) {
      setContactMessage("Failed to send message. Please try again.")
    } finally {
      setIsContactSubmitting(false)
    }
  }

  // Handle category selection
  const handleCategoryClick = (category) => {
    if (!isClient) return
    alert(`Exploring ${category} vendors... This would open the app or vendor listing page.`)
  }

  // Toggle FAQ
  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  // Static data arrays - moved outside component to prevent SSR issues
  const features = [
    {
      icon: Shield,
      title: "Verified Vendors",
      description: "All vendors are thoroughly verified and trusted",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: Zap,
      title: "Real-Time Booking",
      description: "Instant booking confirmations and updates",
      color: "from-green-400 to-green-600",
    },
    {
      icon: MessageCircle,
      title: "Chat with Vendors",
      description: "Direct communication with service providers",
      color: "from-purple-400 to-purple-600",
    },
    {
      icon: Filter,
      title: "Custom Filters",
      description: "Find exactly what you need with smart filters",
      color: "from-pink-400 to-pink-600",
    },
    {
      icon: Palette,
      title: "Decor",
      description: "Beautiful decoration services for any occasion",
      color: "from-indigo-400 to-indigo-600",
    },
    {
      icon: Camera,
      title: "Photography",
      description: "Professional photographers and videographers",
      color: "from-red-400 to-red-600",
    },
    {
      icon: Music,
      title: "Music / Audio Video",
      description: "Complete entertainment solutions",
      color: "from-orange-400 to-orange-600",
    },
    {
      icon: Users,
      title: "& More",
      description: "Catering, venues, and many other services",
      color: "from-teal-400 to-teal-600",
    },
  ]

  const categories = [
    { name: "Wedding Planning", count: "1,200+ vendors", icon: "💒", gradient: "from-rose-100 to-pink-100" },
    { name: "Birthday Parties", count: "800+ vendors", icon: "🎂", gradient: "from-yellow-100 to-orange-100" },
    { name: "Corporate Events", count: "600+ vendors", icon: "🏢", gradient: "from-blue-100 to-indigo-100" },
    { name: "Photography", count: "1,500+ vendors", icon: "📸", gradient: "from-purple-100 to-violet-100" },
    { name: "Catering", count: "900+ vendors", icon: "🍽️", gradient: "from-green-100 to-emerald-100" },
    { name: "Decoration", count: "700+ vendors", icon: "🎨", gradient: "from-pink-100 to-rose-100" },
    { name: "Entertainment", count: "500+ vendors", icon: "🎭", gradient: "from-indigo-100 to-blue-100" },
    { name: "Venues", count: "300+ vendors", icon: "🏛️", gradient: "from-gray-100 to-slate-100" },
  ]

  const stats = [
    { number: "5,000+", label: "Vendors Listed", icon: Users, color: "from-blue-500 to-blue-600", value: count1 },
    { number: "20+", label: "Cities Covered", icon: Globe, color: "from-green-500 to-green-600", value: count2 },
    { number: "10,000", label: "Events Supported", icon: Award, color: "from-purple-500 to-purple-600", value: count3 },
    { number: "4.8★", label: "App Rating", icon: Star, color: "from-yellow-500 to-yellow-600", value: count4 },
  ]

  const faqs = [
    {
      question: "How do I book a vendor through Saral Events?",
      answer:
        "Simply download our app, browse through verified vendors in your category, compare prices and reviews, then book directly through the app. You'll receive instant confirmation and can track your booking status in real-time.",
    },
    {
      question: "Are all vendors verified on your platform?",
      answer:
        "Yes, absolutely! Every vendor goes through our rigorous verification process including background checks, license verification, portfolio review, and customer feedback analysis before being approved on our platform.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major payment methods including credit/debit cards, UPI, net banking, and digital wallets. All payments are secure and processed through encrypted channels.",
    },
    {
      question: "Can I cancel or modify my booking?",
      answer:
        "Yes, you can cancel or modify your booking based on the vendor's cancellation policy. Most vendors allow free cancellation up to 48 hours before the event. Check individual vendor policies for specific terms.",
    },
    {
      question: "How do you ensure service quality?",
      answer:
        "We maintain quality through vendor verification, customer reviews, regular quality audits, and a dedicated support team. If you're not satisfied, we have a resolution process to address any issues.",
    },
    {
      question: "Is there a booking fee?",
      answer:
        "Saral Events is free to use for customers. We charge a small commission to vendors only when they receive confirmed bookings. There are no hidden fees for users.",
    },
  ]

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      details: ["+91-98765-43210", "+91-87654-32109"],
      action: handlePhoneCall,
      color: "from-green-400 to-green-600",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@saralevents.com", "support@saralevents.com"],
      action: handleEmail,
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["123 Business District", "Mumbai, Maharashtra 400001"],
      action: () => isClient && window.open("https://maps.google.com", "_blank"),
      color: "from-red-400 to-red-600",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon-Fri: 9:00 AM - 8:00 PM", "Sat-Sun: 10:00 AM - 6:00 PM"],
      action: null,
      color: "from-purple-400 to-purple-600",
    },
  ]

  // App Store Button Component
  const AppStoreButton = ({ platform, onClick }) => {
    if (platform === "ios") {
      return (
        <button
          onClick={onClick}
          className="flex items-center bg-black text-white px-4 py-3 rounded-xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg min-w-[140px]"
        >
          <div className="mr-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
          </div>
          <div className="text-left">
            <div className="text-xs">Download on the</div>
            <div className="text-sm font-semibold">App Store</div>
          </div>
        </button>
      )
    } else {
      return (
        <button
          onClick={onClick}
          className="flex items-center bg-black text-white px-4 py-3 rounded-xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg min-w-[140px]"
        >
          <div className="mr-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
            </svg>
          </div>
          <div className="text-left">
            <div className="text-xs">Get it on</div>
            <div className="text-sm font-semibold">Google Play</div>
          </div>
        </button>
      )
    }
  }

  // Show loading state during SSR
  if (!isClient) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Saral Events...</p>
        </div>
      </div>
    )
  }

  return (
    <SafeComponent>
      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-yellow-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-24">
            <div
  className="flex items-center cursor-pointer"
  onClick={() => scrollToSection('hero')}
>
<div className="bg-white p-2 rounded-xl shadow-sm h-24 flex items-center">
<img
  src="/images/Copy%20of%20SARAL%20EVENTS%20LOGO/5-removebg-preview.png"
  alt="Saral Events"
  className="h-28 w-auto object-contain"
/>

</div>

</div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-8">
                  <button
                    onClick={() => scrollToSection("hero")}
                    className={`px-3 py-2 text-sm font-medium transition-all duration-300 ${
                      activeSection === "hero"
                        ? "text-yellow-600 border-b-2 border-yellow-600"
                        : "text-gray-700 hover:text-yellow-600"
                    }`}
                  >
                    Home
                  </button>
                  <button
                    onClick={() => scrollToSection("features")}
                    className={`px-3 py-2 text-sm font-medium transition-all duration-300 ${
                      activeSection === "features"
                        ? "text-yellow-600 border-b-2 border-yellow-600"
                        : "text-gray-700 hover:text-yellow-600"
                    }`}
                  >
                    Features
                  </button>
                  <button
                    onClick={() => scrollToSection("categories")}
                    className={`px-3 py-2 text-sm font-medium transition-all duration-300 ${
                      activeSection === "categories"
                        ? "text-yellow-600 border-b-2 border-yellow-600"
                        : "text-gray-700 hover:text-yellow-600"
                    }`}
                  >
                    Categories
                  </button>
                  <button
                    onClick={() => scrollToSection("faq")}
                    className={`px-3 py-2 text-sm font-medium transition-all duration-300 ${
                      activeSection === "faq"
                        ? "text-yellow-600 border-b-2 border-yellow-600"
                        : "text-gray-700 hover:text-yellow-600"
                    }`}
                  >
                    FAQ
                  </button>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className={`px-3 py-2 text-sm font-medium transition-all duration-300 ${
                      activeSection === "contact"
                        ? "text-yellow-600 border-b-2 border-yellow-600"
                        : "text-gray-700 hover:text-yellow-600"
                    }`}
                  >
                    Contact
                  </button>
                  <button
                    onClick={() => scrollToSection("vendor-registration")}
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105"
                  >
                    For Vendors
                  </button>
                </div>
              </div>

              <div className="md:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 hover:text-yellow-600">
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-md shadow-lg border-t border-yellow-100">
                <button
                  onClick={() => scrollToSection("hero")}
                  className="text-gray-700 hover:text-yellow-600 block px-3 py-2 text-base font-medium w-full text-left"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("features")}
                  className="text-gray-700 hover:text-yellow-600 block px-3 py-2 text-base font-medium w-full text-left"
                >
                  Features
                </button>
                <button
                  onClick={() => scrollToSection("categories")}
                  className="text-gray-700 hover:text-yellow-600 block px-3 py-2 text-base font-medium w-full text-left"
                >
                  Categories
                </button>
                <button
                  onClick={() => scrollToSection("faq")}
                  className="text-gray-700 hover:text-yellow-600 block px-3 py-2 text-base font-medium w-full text-left"
                >
                  FAQ
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-gray-700 hover:text-yellow-600 block px-3 py-2 text-base font-medium w-full text-left"
                >
                  Contact
                </button>
                <button
                  onClick={() => scrollToSection("vendor-registration")}
                  className="text-gray-700 hover:text-yellow-600 block px-3 py-2 text-base font-medium w-full text-left"
                >
                  For Vendors
                </button>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section with Enhanced Design */}
        <section
          id="hero"
          className="relative bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 py-20 overflow-hidden"
        >
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-yellow-200/30 to-orange-200/30 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-amber-200/30 to-yellow-200/30 rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-yellow-700 border border-yellow-200">
                    <Star className="w-4 h-4 mr-2 text-yellow-500" />
                    India's #1 Event Planning Platform
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                    Plan{" "}
                    <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                      Less
                    </span>
                    <br />
                    Celebrate{" "}
                    <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                      More
                    </span>
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Your one-stop solution for all event planning needs. Connect with verified vendors, book services
                    instantly, and make your celebrations unforgettable.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => handleAppDownload("android")}
                    className="group bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-yellow-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
                  >
                    <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                    Download App
                  </button>
                  <button
                    onClick={() => scrollToSection("categories")}
                    className="group border-2 border-yellow-600 text-yellow-600 px-8 py-4 rounded-xl font-semibold hover:bg-yellow-600 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center"
                  >
                    <ArrowRight className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    Explore Vendors
                  </button>
                </div>

                <div className="flex items-center space-x-8 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">5K+</div>
                    <div className="text-sm text-gray-600">Vendors</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">20+</div>
                    <div className="text-sm text-gray-600">Cities</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">4.8★</div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl blur-2xl opacity-20 transform rotate-6"></div>
                  <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/50">
                    <div className="text-center mb-6">
                    <div
  className="mx-auto mb-2 w-48 h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center cursor-pointer hover:from-gray-100 hover:to-gray-200 transition-all duration-300 transform hover:scale-105 shadow-inner"
  onClick={handleQRScan}
>
                        <div className="text-6xl animate-pulse">📱</div>
                      </div>
                      <p className="text-sm font-semibold text-gray-700 mb-4 tracking-wide">SCAN TO DOWNLOAD</p>
                    </div>

                    <div className="flex gap-3">
                      <AppStoreButton platform="ios" onClick={() => handleAppDownload("ios")} />
                      <AppStoreButton platform="android" onClick={() => handleAppDownload("android")} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Features Section */}
        <section id="features" className="py-20 bg-white relative">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-yellow-100 rounded-full text-sm font-medium text-yellow-700 mb-4">
                <Zap className="w-4 h-4 mr-2" />
                Everything You Need
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Comprehensive Event Planning Tools</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From vendor discovery to booking management, we've got every aspect of your event planning covered
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative bg-white p-8 rounded-2xl border border-gray-100 hover:border-yellow-200 hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
                  onClick={() => alert(`Learn more about ${feature.title} - This would open detailed information.`)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 to-orange-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Categories Section */}
        <section id="categories" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-50/30 to-orange-50/30"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-yellow-700 mb-4 border border-yellow-200">
                <Filter className="w-4 h-4 mr-2" />
                Browse by Category
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Find Perfect Vendors</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover specialized vendors for your specific event needs across multiple categories
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className={`group relative bg-gradient-to-br ${category.gradient} p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 border border-white/50`}
                  onClick={() => handleCategoryClick(category.name)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-yellow-700 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">{category.count}</p>
                    <div className="flex items-center justify-end text-yellow-600 group-hover:text-yellow-700 transition-colors">
                      <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Stats Section */}
        <section
          id="stats"
          className="py-20 bg-gradient-to-r from-yellow-600 via-orange-500 to-amber-600 relative overflow-hidden"
        >
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-yellow-600/90 to-orange-600/90"></div>
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white mb-4 border border-white/30">
                <TrendingUp className="w-4 h-4 mr-2" />
                Our Impact
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Built for Big Moments</h2>
              <p className="text-xl text-yellow-100 max-w-3xl mx-auto">
                Trusted by thousands for their most important celebrations and events
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                let displayValue
                if (stat.number.includes("★")) {
                  displayValue = `${stat.value.toFixed(1)}★`
                } else if (stat.number.includes("+")) {
                  if (stat.number.includes(",")) {
                    displayValue = `${Math.floor(stat.value).toLocaleString()}+`
                  } else {
                    displayValue = `${Math.floor(stat.value)}+`
                  }
                } else {
                  displayValue = Math.floor(stat.value).toLocaleString()
                }

                return (
                  <div key={index} className="text-center group">
                    <div className="relative mb-6">
                      <div
                        className={`w-20 h-20 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-transform duration-300`}
                      >
                        <stat.icon className="h-10 w-10 text-white" />
                      </div>
                    </div>
                    <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                      {displayValue}
                    </div>
                    <div className="text-yellow-100 text-lg font-medium">{stat.label}</div>
                  </div>
                )
              })}
            </div>

            <div className="text-center mt-16">
              <button
                onClick={() => scrollToSection("vendor-registration")}
                className="bg-white text-yellow-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Join Our Success Story
              </button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-yellow-100 rounded-full text-sm font-medium text-yellow-700 mb-4">
                <Headphones className="w-4 h-4 mr-2" />
                Frequently Asked Questions
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Got Questions? We've Got Answers</h2>
              <p className="text-xl text-gray-600">Everything you need to know about Saral Events and our services</p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 rounded-2xl transition-colors duration-300"
                  >
                    <span className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</span>
                    {openFAQ === index ? (
                      <ChevronUp className="h-6 w-6 text-yellow-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {openFAQ === index && (
                    <div className="px-8 pb-6">
                      <div className="pt-4 border-t border-gray-100">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-4">Still have questions?</p>
              <button
                onClick={() => scrollToSection("contact")}
                className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-yellow-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105"
              >
                Contact Our Support Team
              </button>
            </div>
          </div>
        </section>

        {/* Contact Us Section */}
        <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-yellow-700 mb-4 border border-yellow-200">
                <MessageCircle className="w-4 h-4 mr-2" />
                Get in Touch
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Have questions or need assistance? We're here to help make your event planning journey smooth
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {contactInfo.map((info, index) => (
                    <div
                      key={index}
                      className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${info.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <info.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">{info.title}</h3>
                      <div className="space-y-2">
                        {info.details.map((detail, idx) => (
                          <div key={idx}>
                            {info.action ? (
                              <button
                                onClick={() => info.action(detail)}
                                className="text-gray-600 hover:text-yellow-600 transition-colors duration-300 text-left block"
                              >
                                {detail}
                              </button>
                            ) : (
                              <p className="text-gray-600">{detail}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-yellow-600 to-orange-600 p-8 rounded-2xl text-white">
                  <h3 className="text-2xl font-bold mb-4">Need Immediate Help?</h3>
                  <p className="mb-6 text-yellow-100">
                    Our support team is available 24/7 to assist you with any urgent queries or booking issues.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => handlePhoneCall("+91-98765-43210")}
                      className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 flex items-center justify-center"
                    >
                      <Phone className="mr-2 h-5 w-5" />
                      Call Now
                    </button>
                    <button
                      onClick={() => handleEmail("support@saralevents.com")}
                      className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 flex items-center justify-center"
                    >
                      <Mail className="mr-2 h-5 w-5" />
                      Email Us
                    </button>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white p-8 rounded-2xl shadow-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      name="name"
                      value={contactForm.name}
                      onChange={handleContactInputChange}
                      placeholder="Your Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-600 focus:border-transparent transition-all duration-300"
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleContactInputChange}
                      placeholder="Email Address"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-600 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={contactForm.phone}
                    onChange={handleContactInputChange}
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-600 focus:border-transparent transition-all duration-300"
                    required
                  />
                  <textarea
                    name="message"
                    value={contactForm.message}
                    onChange={handleContactInputChange}
                    placeholder="Your Message"
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-600 focus:border-transparent transition-all duration-300 resize-none"
                    required
                  ></textarea>
                  <button
                    type="submit"
                    disabled={isContactSubmitting}
                    className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 text-white py-4 rounded-xl font-semibold hover:from-yellow-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isContactSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
                {contactMessage && (
                  <div
                    className={`mt-6 p-4 rounded-xl text-sm ${
                      contactMessage.includes("successful") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {contactMessage}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-r from-yellow-500 via-orange-500 to-amber-500 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Plan Your Next Event?</h2>
            <p className="text-xl text-yellow-100 mb-12 max-w-3xl mx-auto">
              Join thousands of satisfied customers who trust Saral Events for their special occasions. Start exploring
              vendors in your city today.
            </p>

            <div className="flex flex-col lg:flex-row gap-8 justify-center items-center">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                <div
                  className="w-40 h-40 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 cursor-pointer hover:bg-white/30 transition-all duration-300 transform hover:scale-105"
                  onClick={handleQRScan}
                >
                  <div className="text-6xl animate-pulse">📱</div>
                </div>
                <p className="text-sm font-semibold text-white tracking-wide">SCAN TO DOWNLOAD</p>
              </div>

              <div className="flex flex-col gap-4">
                <AppStoreButton platform="ios" onClick={() => handleAppDownload("ios")} />
                <AppStoreButton platform="android" onClick={() => handleAppDownload("android")} />
                <p className="text-yellow-100 text-sm mt-2">Free to download • No hidden charges</p>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Vendor Registration */}
        <section id="vendor-registration" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div>
                  <div className="inline-flex items-center px-4 py-2 bg-yellow-100 rounded-full text-sm font-medium text-yellow-700 mb-4">
                    <Users className="w-4 h-4 mr-2" />
                    For Business Partners
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Join Our Vendor Network</h2>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Grow your business by connecting with customers who need your services. Register as a vendor and
                    start receiving bookings today.
                  </p>
                </div>

                <div className="space-y-6">
                  {[
                    { icon: TrendingUp, text: "Reach thousands of potential customers daily" },
                    { icon: Zap, text: "Manage bookings and payments with ease" },
                    { icon: Star, text: "Build your reputation with customer reviews" },
                    { icon: Award, text: "Get featured as a top-rated vendor" },
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center group">
                      <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <benefit.icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{benefit.text}</span>
                    </div>
                  ))}
                </div>

                
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-3xl shadow-xl border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Registration</h3>
                <form onSubmit={handleVendorSubmit} className="space-y-6">
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    placeholder="Business Name"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-600 focus:border-transparent transition-all duration-300 bg-white"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-600 focus:border-transparent transition-all duration-300 bg-white"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-600 focus:border-transparent transition-all duration-300 bg-white"
                    required
                  />
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-600 focus:border-transparent transition-all duration-300 bg-white"
                    required
                  >
                    <option value="">Select Service Category</option>
                    <option value="photography">Photography & Videography</option>
                    <option value="catering">Catering Services</option>
                    <option value="decoration">Decoration & Design</option>
                    <option value="entertainment">Entertainment & Music</option>
                    <option value="venues">Venues & Locations</option>
                    <option value="wedding-planning">Wedding Planning</option>
                    <option value="other">Other Services</option>
                  </select>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 text-white py-4 rounded-xl font-semibold hover:from-yellow-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  >
                    {isSubmitting ? "Submitting..." : "Get Started Today"}
                  </button>
                </form>
                {submitMessage && (
                  <div
                    className={`mt-6 p-4 rounded-xl text-sm ${
                      submitMessage.includes("successful") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {submitMessage}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Footer */}
        <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-yellow-600/10 to-orange-600/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-amber-600/10 to-yellow-600/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <div className="space-y-6">
                <img src="/images/saral-logo.png" alt="Saral Events" className="h-20 w-auto" />
                <p className="text-gray-400 leading-relaxed">
                  Making event planning simple and celebrations memorable. Your trusted partner for all occasions.
                </p>
                <div className="flex space-x-4">
                  {[
                    { platform: "facebook", url: "https://facebook.com/saralevents", icon: "f" },
                    { platform: "twitter", url: "https://twitter.com/saralevents", icon: "t" },
                    { platform: "linkedin", url: "https://linkedin.com/company/saralevents", icon: "in" },
                    { platform: "instagram", url: "https://instagram.com/saralevents", icon: "ig" },
                  ].map((social, index) => (
                    <button
                      key={index}
                      onClick={() => isClient && window.open(social.url, "_blank")}
                      className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-r hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-110"
                    >
                      <span className="text-sm font-bold">{social.icon}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-6 text-white">Services</h3>
                <ul className="space-y-3 text-gray-400">
                  {["Wedding Planning", "Photography", "Catering", "Decoration", "Entertainment", "Venues"].map(
                    (service, index) => (
                      <li key={index}>
                        <button
                          onClick={() => handleCategoryClick(service)}
                          className="hover:text-yellow-400 transition-colors text-left group flex items-center"
                        >
                          <ChevronRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                          {service}
                        </button>
                      </li>
                    ),
                  )}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-6 text-white">Company</h3>
                <ul className="space-y-3 text-gray-400">
                  {[
                    { name: "About Us", action: () => alert("About Us - Learn more about Saral Events") },
                    { name: "Contact", action: () => scrollToSection("contact") },
                    { name: "Careers", action: () => alert("Careers - Join our team!") },
                    { name: "Press", action: () => alert("Press - Latest news and updates") },
                    { name: "Blog", action: () => alert("Blog - Event planning tips and guides") },
                  ].map((item, index) => (
                    <li key={index}>
                      <button
                        onClick={item.action}
                        className="hover:text-yellow-400 transition-colors text-left group flex items-center"
                      >
                        <ChevronRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-6 text-white">Support</h3>
                <ul className="space-y-3 text-gray-400">
                  {[
                    { name: "Help Center", action: () => scrollToSection("faq") },
                    { name: "Privacy Policy", action: () => alert("Privacy Policy - How we protect your data") },
                    { name: "Terms of Service", action: () => alert("Terms of Service - User agreement") },
                    { name: "Vendor Guidelines", action: () => alert("Vendor Guidelines - Rules for vendors") },
                    { name: "Refund Policy", action: () => alert("Refund Policy - Our refund terms") },
                  ].map((item, index) => (
                    <li key={index}>
                      <button
                        onClick={item.action}
                        className="hover:text-yellow-400 transition-colors text-left group flex items-center"
                      >
                        <ChevronRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-8">
              <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
                <p className="text-gray-400 text-center lg:text-left">
                  &copy; 2024 Saral Events. All rights reserved. Plan Less, Celebrate More.
                </p>
                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-8 text-gray-400">
                  <button
                    onClick={() => handlePhoneCall("+91-98765-43210")}
                    className="flex items-center hover:text-yellow-400 transition-colors group"
                  >
                    <Phone className="h-4 w-4 mr-2 group-hover:animate-pulse" />
                    <span>+91-98765-43210</span>
                  </button>
                  <button
                    onClick={() => handleEmail("info@saralevents.com")}
                    className="flex items-center hover:text-yellow-400 transition-colors group"
                  >
                    <Mail className="h-4 w-4 mr-2 group-hover:animate-pulse" />
                    <span>info@saralevents.com</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </SafeComponent>
  )
}
