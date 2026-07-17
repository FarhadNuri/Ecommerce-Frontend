"use client";
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { ChevronRight, ChevronDown, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CheckoutClient() {
  const { state, cartTotal } = useCart();
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
  });

  const shippingCost = shippingMethod === 'standard' ? 12 : 25;
  const total = cartTotal + shippingCost;
  const tax = total * 0.088;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Form validated! Routing to confirmation (Step 8 Bonus)');
  };

  const renderSummaryContent = () => (
    <>
      <div className="space-y-4 mb-6 border-b border-[#E5E5E5] pb-6 mt-6 md:mt-0">
        {state.items.map(item => (
          <div key={item.cartItemId} className="flex justify-between items-center gap-4">
            <div className="relative">
              <div className="w-[60px] h-[75px] bg-[#E5E5E5] border border-[#D1D1D1]/50 rounded-[4px] overflow-hidden">
                <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
              </div>
              <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 bg-[#737373] text-white text-[10px] font-bold rounded-full backdrop-blur-sm shadow-sm">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1 flex flex-col pt-1">
              <span className="text-[12px] font-medium text-text-primary uppercase tracking-wide">{item.product.name}</span>
              {item.size && <span className="text-[11px] text-text-secondary mt-0.5">Size: {item.size}</span>}
            </div>
            <span className="text-[13px] font-medium text-text-primary">${(item.product.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Discount code"
          className="flex-1 border border-[#D1D1D1] bg-white rounded-[4px] px-3 py-3 text-[13px] focus:outline-none focus:border-text-primary placeholder:text-text-secondary/70"
        />
        <button className="bg-[#E5E5E5] text-text-primary rounded-[4px] px-6 text-[13px] font-medium hover:bg-[#D1D1D1] transition-colors cursor-pointer">
          Apply
        </button>
      </div>

      <div className="space-y-3 mb-6 text-[13px] border-b border-[#E5E5E5] pb-6">
        <div className="flex justify-between text-text-secondary">
          <span>Subtotal</span>
          <span className="text-text-primary">${cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-text-secondary">
          <span>Shipping</span>
          <span className="text-text-primary">${shippingCost.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-between items-center pt-2">
        <span className="font-serif text-[18px] font-bold text-text-primary">Total</span>
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-text-secondary">USD</span>
          <span className="font-bold text-[24px] text-text-primary">${total.toFixed(2)}</span>
        </div>
      </div>
      <p className="text-[9px] text-text-secondary text-right mt-1">Including ${tax.toFixed(2)} in taxes</p>
    </>
  );

  return (
    <div className="flex-1 flex flex-col md:flex-row bg-white min-h-screen">
      <div className="w-full md:w-[55%] lg:w-[60%] flex justify-end bg-white">
        <div className="w-full max-w-[700px] px-4 sm:px-8 lg:px-12 pt-12 pb-24 relative">

          <div className="mb-0 md:mb-14 text-center md:text-left pt-2 md:pt-0">
            <Link href="/" className="font-serif text-[26px] font-bold tracking-tight text-text-primary inline-block mb-6 md:mb-6">
              VERA
            </Link>

            <div className="hidden md:flex items-center justify-start gap-2 text-[11px] text-text-secondary tracking-wide font-medium">
              <span className="text-text-primary">Information</span>
              <ChevronRight size={12} strokeWidth={1.5} />
              <span>Shipping</span>
              <ChevronRight size={12} strokeWidth={1.5} />
              <span>Payment</span>
            </div>

            <div className="md:hidden flex items-center justify-center gap-8 text-[10px] font-bold tracking-widest text-text-secondary pb-8 border-b border-[#E5E5E5] -mx-4 px-4 sm:-mx-8 sm:px-8">
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-[13px]">1</div>
                <span className="text-black">INFO</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#E5E5E5] text-black flex items-center justify-center text-[13px]">2</div>
                <span>SHIPPING</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#E5E5E5] text-black flex items-center justify-center text-[13px]">3</div>
                <span>PAYMENT</span>
              </div>
            </div>
          </div>

          <div className="md:hidden bg-[#F5F4F1] border-b border-[#E5E5E5] -mx-4 sm:-mx-8 px-4 sm:px-8 py-5 mb-8">
            <button
              type="button"
              onClick={() => setIsSummaryOpen(!isSummaryOpen)}
              className="w-full flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2 text-[14px] text-text-primary">
                <ShoppingBag size={18} strokeWidth={1.5} />
                <span>Show order summary</span>
                <ChevronDown size={16} strokeWidth={1.5} className={`transition-transform ${isSummaryOpen ? 'rotate-180' : ''}`} />
              </div>
              <span className="font-medium text-[16px] text-text-primary">${total.toFixed(2)}</span>
            </button>

            <div className={`overflow-hidden transition-all duration-300 ${isSummaryOpen ? 'max-h-[1500px] opacity-100' : 'max-h-0 opacity-0'}`}>
              {renderSummaryContent()}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-10">
              <div className="flex justify-between items-end mb-4">
                <h2 className="font-serif text-[20px] text-text-primary">Contact Information</h2>
              </div>
              <input
                type="email"
                placeholder="Email address"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full border border-[#D1D1D1] rounded-[4px] px-3 py-3 text-[13px] focus:outline-none focus:border-text-primary transition-colors mb-3 placeholder:text-text-secondary/70"
              />
              <label className="flex items-center gap-2 cursor-pointer mt-3">
                <input type="checkbox" className="w-4 h-4 rounded-[4px] border border-[#D1D1D1] checked:bg-text-primary focus:ring-0 cursor-pointer" />
                <span className="text-[13px] text-text-secondary">Email me with news and offers</span>
              </label>
            </div>
            <div className="mb-12">
              <h2 className="font-serif text-[20px] text-text-primary mb-4">Shipping Address</h2>

              <div className="relative mb-3">
                <select className="w-full border border-[#D1D1D1] rounded-[4px] px-3 py-3 text-[13px] appearance-none bg-transparent focus:outline-none focus:border-text-primary transition-colors text-text-primary">
                  <option value="BD">Bangladesh</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary">
                  <ChevronDown size={14} strokeWidth={1.5} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <input
                  type="text"
                  placeholder="First name"
                  required
                  value={formData.firstName}
                  onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full border border-[#D1D1D1] rounded-[4px] px-3 py-3 text-[13px] focus:outline-none focus:border-text-primary transition-colors placeholder:text-text-secondary/70"
                />
                <input
                  type="text"
                  placeholder="Last name"
                  required
                  value={formData.lastName}
                  onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full border border-[#D1D1D1] rounded-[4px] px-3 py-3 text-[13px] focus:outline-none focus:border-text-primary transition-colors placeholder:text-text-secondary/70"
                />
              </div>

              <input
                type="text"
                placeholder="Address"
                required
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
                className="w-full border border-[#D1D1D1] rounded-[4px] px-3 py-3 text-[13px] focus:outline-none focus:border-text-primary transition-colors mb-3 placeholder:text-text-secondary/70"
              />

              <input
                type="text"
                placeholder="Apartment, suite, etc. (optional)"
                className="w-full border border-[#D1D1D1] rounded-[4px] px-3 py-3 text-[13px] focus:outline-none focus:border-text-primary transition-colors mb-3 placeholder:text-text-secondary/70"
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                <input
                  type="text"
                  placeholder="City"
                  required
                  value={formData.city}
                  onChange={e => setFormData({ ...formData, city: e.target.value })}
                  className="w-full border border-[#D1D1D1] rounded-[4px] px-3 py-3 text-[13px] focus:outline-none focus:border-text-primary transition-colors placeholder:text-text-secondary/70"
                />
                <div className="relative">
                  <select
                    required
                    value={formData.state}
                    onChange={e => setFormData({ ...formData, state: e.target.value })}
                    className="w-full border border-[#D1D1D1] rounded-[4px] px-3 py-3 text-[13px] appearance-none bg-transparent focus:outline-none focus:border-text-primary transition-colors text-text-primary"
                  >
                    <option value="" disabled>State/Division</option>
                    <option value="DH">Dhaka</option>
                    <option value="CH">Chattogram</option>
                    <option value="RA">Rajshahi</option>
                    <option value="RN">Rangpur</option>
                    <option value="SY">Sylhet</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary">
                    <ChevronDown size={14} strokeWidth={1.5} />
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="ZIP code"
                  required
                  value={formData.zip}
                  onChange={e => setFormData({ ...formData, zip: e.target.value })}
                  className="w-full border border-[#D1D1D1] rounded-[4px] px-3 py-3 text-[13px] focus:outline-none focus:border-text-primary transition-colors placeholder:text-text-secondary/70"
                />
              </div>

              <input
                type="tel"
                placeholder="Phone"
                required
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full border border-[#D1D1D1] rounded-[4px] px-3 py-3 text-[13px] focus:outline-none focus:border-text-primary transition-colors placeholder:text-text-secondary/70"
              />
            </div>

            <div className="mb-10">
              <h2 className="font-serif text-[20px] text-text-primary mb-4">Shipping Method</h2>

              <div className="border border-[#D1D1D1] rounded-[4px] divide-y divide-[#E5E5E5]">
                <label className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#FAF9F8] transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-[18px] h-[18px] rounded-full border border-text-primary flex items-center justify-center shrink-0 relative">
                      {shippingMethod === 'standard' && <div className="w-[8px] h-[8px] rounded-full bg-text-primary absolute"></div>}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] font-medium text-text-primary">Standard Shipping</span>
                      <span className="text-[12px] text-text-secondary mt-0.5">3-5 business days</span>
                    </div>
                  </div>
                  <span className="text-[13px] font-medium text-text-primary">$12.00</span>
                  <input type="radio" name="shipping" value="standard" checked={shippingMethod === 'standard'} onChange={() => setShippingMethod('standard')} className="hidden" />
                </label>

                <label className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#FAF9F8] transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className={`w-[18px] h-[18px] rounded-full border ${shippingMethod === 'express' ? 'border-text-primary' : 'border-[#D1D1D1] group-hover:border-text-primary/50'} flex items-center justify-center shrink-0 relative`}>
                      {shippingMethod === 'express' && <div className="w-[8px] h-[8px] rounded-full bg-text-primary absolute"></div>}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] font-medium text-text-primary">Express Shipping</span>
                      <span className="text-[12px] text-text-secondary mt-0.5">1-2 business days</span>
                    </div>
                  </div>
                  <span className="text-[13px] font-medium text-text-primary">$25.00</span>
                  <input type="radio" name="shipping" value="express" checked={shippingMethod === 'express'} onChange={() => setShippingMethod('express')} className="hidden" />
                </label>
              </div>
            </div>

            <div className="pt-6 flex flex-col-reverse sm:flex-row justify-between items-center gap-6 border-t border-[#E5E5E5]">
              <Link href="/cart" className="text-[13px] text-text-primary hover:text-text-secondary flex items-center gap-2 transition-colors">
                <ChevronRight size={14} className="rotate-180" /> Return to cart
              </Link>
              <button
                type="submit"
                className="w-full sm:w-auto bg-black md:bg-[#1B4D3E] text-white px-8 py-[18px] rounded-[4px] text-[13px] font-medium tracking-wide hover:bg-black/90 md:hover:bg-accent/90 transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                Continue to Payment <ArrowRight size={16} />
              </button>
            </div>

            <div className="mt-16 pt-6 border-t border-[#E5E5E5] flex gap-4 text-[10px] text-text-secondary">
              <Link href="#" className="hover:text-text-primary">Privacy Policy</Link>
              <Link href="#" className="hover:text-text-primary">Terms of Service</Link>
              <Link href="#" className="hover:text-text-primary">Contact</Link>
            </div>

          </form>
        </div>
      </div>

      <div className="hidden md:flex w-full md:w-[45%] lg:w-[40%] bg-[#F5F4F1] border-l border-[#E5E5E5] justify-start relative">
        <div className="w-full max-w-[500px] px-4 sm:px-8 lg:px-12 pt-12 pb-24 sticky top-0 h-fit">
          <h2 className="font-serif text-[20px] text-text-primary mb-6">Order Summary</h2>
          {renderSummaryContent()}
        </div>
      </div>
    </div>
  );
}
