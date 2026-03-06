import { Logo } from "../icons/Logo"

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-purple-medium/20 py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6 text-purple-dark">
            <Logo />
            <span className="text-2xl font-bold">Second Brain</span>
          </div>
          <p className="text-slate-600 max-w-sm font-light">
            The infrastructure for your digital mind. Organize your knowledge, 
            retrieve it instantly, and connect the dots between your ideas.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-slate-800 mb-6">Product</h4>
          <ul className="space-y-4 text-slate-600 font-light">
            <li>Features</li>
            <li>Pricing</li>
            <li>API</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-slate-800 mb-6">Resources</h4>
          <ul className="space-y-4 text-slate-600 font-light">
            <li>Documentation</li>
            <li>Blog</li>
            <li>Guides</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-purple-medium/10 text-slate-500 text-sm">
        © 2024 Second Brain. All rights reserved.
      </div>
    </footer>
  )
}
