import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, Users, Settings, Bell, Search } from "lucide-react"
import { ArrowUpRight, Clock, Target, FileText, Calendar, Mail } from "lucide-react"
import Image from "next/image"

const NavItem = ({ icon, text, active = false }: { icon: React.ReactNode; text: string; active?: boolean }) => {
  return (
    <a href="#" className="group relative px-4 py-2">
      <div className="flex items-center space-x-2.5 text-black/80 group-hover:text-black transition-all">
        {icon}
        <span className="font-medium text-sm">{text}</span>
      </div>
      <div
        className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 
        ${active ? "w-full opacity-100" : "w-0 opacity-0"} 
        group-hover:w-full group-hover:opacity-100`}
      />
      {active && <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-lg -z-10" />}
    </a>
  )
}

export default function Dashboard() {
  const session = cookies().get("session")

  if (!session) {
    redirect("/")
  }

  const email = session.value
  const name = email.split("@")[0].toUpperCase()

  const handleLogout = async () => {
    "use server"
    cookies().delete("session")
    redirect("/")
  }

  const startDate = new Date("2025-02-03T11:00:00") // Start date and time: 3rd Feb 2025, 11:00 AM
  const currentDate = new Date() // Current date and time

  // Calculate the difference in milliseconds
  const timeDiff = currentDate.getTime() - startDate.getTime()

  // Convert milliseconds to days (including fractional days for time)
  const totalDays = timeDiff / (1000 * 60 * 60 * 24)

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Main Navigation */}
      <header className="bg-white/5 backdrop-blur-md border-b border-white/10 shadow-xl fixed w-full top-0 z-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <div className="flex items-center space-x-4 group">
              <Image
                src="https://www.aganitha.ai/wp-content/uploads/2023/05/aganitha-logo.png"
                alt="Logo"
                width={130}
                height={40}
                className="transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Navigation Items */}
            <nav className="hidden md:flex items-center space-x-6">
              <NavItem
                icon={<Home size={20} className="transition-all group-hover:scale-110" />}
                text="Dashboard"
                active
              />
              <NavItem icon={<Users size={20} className="transition-all group-hover:scale-110" />} text="Team" />
              <NavItem
                icon={<Bell size={20} className="transition-all group-hover:scale-110" />}
                text="Notifications"
              />
              <NavItem icon={<Settings size={20} className="transition-all group-hover:scale-110" />} text="Settings" />
            </nav>

            {/* Right Section */}
            <div className="flex items-center space-x-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 hover:border-black/80 group-hover:opacity-20 transition-opacity blur-sm" />
                <div className="relative flex items-center bg-/5 backdrop-blur-sm border border-black/10 rounded-xl overflow-hidden transition-all hover:border-white/20">
                  <Search className="h-5 w-5 text-black/80 ml-4" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent text-black placeholder:text-black/60 px-4 py-2.5 text-sm focus:outline-none w-48"
                  />
                </div>
              </div>

              <form action={handleLogout} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-lg" />
                <Button
                  variant="ghost"
                  type="submit"
                  className="relative bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:from-pink-700 hover:to-purple-700 rounded-full px-6 py-2.5 transition-all transform hover:scale-105 shadow-lg hover:shadow-pink-500/20"
                >
                  Logout
                  <ArrowUpRight className="w-4 h-4 ml-2 opacity-80" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 container mx-auto px-6">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
          <div className="relative p-8">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-gray-50 to-gray-100 rounded-bl-full opacity-50" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-gray-50 to-gray-100 rounded-tr-full opacity-50" />

            {/* Main Content */}
            <div className="relative">
              {/* Header Section */}
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome home {name}</h2>
                  <p className="text-xl text-gray-600">
                    Your email address:{" "}
                    <span className="font-bold text-gray-900 hover:underline cursor-grab">{email}</span>
                  </p>
                </div>
                <div className="bg-gray-50 p-2 rounded-full">
                  <ArrowUpRight className="w-6 h-6 text-gray-600" />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    <Users className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total working days</p>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-gray-900 mr-2">{totalDays.toFixed(0)}</span>
                      <span className="text-green-500 text-sm flex items-center">
                        <ArrowUpRight className="w-4 h-4" />
                        {(totalDays / 28) * 100} %
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    <Clock className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total working hours</p>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-gray-900 mr-2">{(totalDays * 8).toFixed(2)}</span>
                      <span className="text-green-500 text-sm flex items-center">
                        <ArrowUpRight className="w-4 h-4" />
                        100 %
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    <Target className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Average Attendance</p>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-gray-900 mr-2">100%</span>
                      <span className="text-green-500 text-sm flex items-center">
                        <ArrowUpRight className="w-4 h-4" />
                        100%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Section */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 p-6 mb-8">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-gray-900">Session Status</h3>
                    <p className="text-gray-600">
                      You have successfully authenticated with Aganitha. Your session is active and secure.
                    </p>
                  </div>
                  <div className="hidden md:flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm text-gray-600">Active Session</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity Feed */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {[
                    {
                      icon: <FileText className="w-5 h-5 text-blue-500" />,
                      text: "Updated project documentation",
                      time: "2 hours ago",
                    },
                    {
                      icon: <Users className="w-5 h-5 text-green-500" />,
                      text: "Joined team meeting",
                      time: "Yesterday",
                    },
                    {
                      icon: <Calendar className="w-5 h-5 text-purple-500" />,
                      text: "Scheduled client presentation",
                      time: "2 days ago",
                    },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-white rounded-full shadow-sm">{activity.icon}</div>
                      <div className="flex-grow">
                        <p className="text-sm text-gray-800">{activity.text}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { icon: <FileText className="w-6 h-6" />, text: "Create Report" },
                    { icon: <Calendar className="w-6 h-6" />, text: "Schedule Meeting" },
                    { icon: <Mail className="w-6 h-6" />, text: "Send Message" },
                  ].map((action, index) => (
                    <button
                      key={index}
                      className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="p-2 bg-white rounded-full shadow-sm">{action.icon}</div>
                      <span className="text-sm font-medium text-gray-800">{action.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

