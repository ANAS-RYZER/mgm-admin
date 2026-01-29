import React from 'react'
import { Button } from '../ui/button';

import { Edit, Filter, Package, Save, Sparkles, X } from 'lucide-react';
import { cn } from '@/lib/utils';

function CustomRequest() {
  return (
    <div>
       <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Configure Custom Request Workflow
                  </h3>
                  <p className="text-sm text-white/60 mt-1">
                    Define stages and assign specialist ateliers for bespoke
                    commissions
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                //   onClick={() => setIsWorkflowModalOpen(false)}
                  className="text-white/60 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-6">
                {/* Workflow Stages */}
                <div>
                  <h4 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-yellow-400" />
                    Workflow Stages
                  </h4>
                  <div className="space-y-3">
                    {[
                      {
                        stage: "Initial Consultation",
                        description:
                          "Client requirements gathering and design brief",
                        duration: "1-2 days",
                      },
                      {
                        stage: "Design Sketch",
                        description: "Initial concept development and approval",
                        duration: "3-5 days",
                      },
                      {
                        stage: "3D Rendering",
                        description: "Digital modeling and visualization",
                        duration: "5-7 days",
                      },
                      {
                        stage: "Material Sourcing",
                        description: "Gemstone and metal procurement",
                        duration: "7-10 days",
                      },
                      {
                        stage: "Artisan Assignment",
                        description: "Matching with specialist karigar",
                        duration: "1-2 days",
                      },
                      {
                        stage: "Production",
                        description: "Handcrafting and assembly",
                        duration: "14-21 days",
                      },
                      {
                        stage: "Quality Assurance",
                        description: "Final inspection and certification",
                        duration: "2-3 days",
                      },
                      {
                        stage: "Delivery Coordination",
                        description: "Packaging and shipping arrangement",
                        duration: "1-2 days",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-white/5"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500/20 border border-yellow-500/30">
                            <span className="text-xs font-semibold text-yellow-400">
                              {index + 1}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">
                              {item.stage}
                            </p>
                            <p className="text-xs text-white/60">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-white/60">
                            {item.duration}
                          </span>
                          <select className="px-2 py-1 text-xs border border-white/20 rounded bg-white/10 text-white">
                            <option className="bg-[#2a0f1c]">
                              Auto-assign
                            </option>
                            <option className="bg-[#2a0f1c]">
                              Manual review
                            </option>
                            <option className="bg-[#2a0f1c]">
                              Client approval
                            </option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Specialist Ateliers */}
                <div>
                  <h4 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                    <Package className="h-5 w-5 text-yellow-400" />
                    Specialist Ateliers
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      {
                        name: "Heritage Craft Studio",
                        specialty: "Traditional Temple Jewelry",
                        capacity: "Active",
                      },
                      {
                        name: "Contemporary Design Lab",
                        specialty: "Modern Bridal Sets",
                        capacity: "Available",
                      },
                      {
                        name: "Royal Atelier",
                        specialty: "High-Value Custom Pieces",
                        capacity: "Limited",
                      },
                      {
                        name: "Diamond Workshop",
                        specialty: "Precision Stone Setting",
                        capacity: "Available",
                      },
                    ].map((atelier, index) => (
                      <div
                        key={index}
                        className="p-3 rounded-lg border border-white/10 bg-white/5"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium text-white">
                            {atelier.name}
                          </p>
                          <div
                            className={cn(
                              "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold",
                              atelier.capacity === "Active"
                                ? "bg-green-100/20 text-green-400 border-green-400/30"
                                : atelier.capacity === "Available"
                                  ? "bg-blue-100/20 text-blue-400 border-blue-400/30"
                                  : "bg-yellow-100/20 text-yellow-400 border-yellow-400/30",
                            )}
                          >
                            {atelier.capacity}
                          </div>
                        </div>
                        <p className="text-xs text-white/60">
                          {atelier.specialty}
                        </p>
                        <div className="mt-2 flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs border-white/20 text-white hover:bg-white/10"
                          >
                            Assign
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-xs text-white/60 hover:text-white"
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Automation Rules */}
                <div>
                  <h4 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                    <Filter className="h-5 w-5 text-yellow-400" />
                    Automation Rules
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-white/5">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="rounded border-white/20 bg-white/10"
                        />
                        <div>
                          <p className="text-sm font-medium text-white">
                            Auto-assign based on value
                          </p>
                          <p className="text-xs text-white/60">
                            Orders above ₹50,000 go to Royal Atelier
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white/60 hover:text-white"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-white/5">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="rounded border-white/20 bg-white/10"
                        />
                        <div>
                          <p className="text-sm font-medium text-white">
                            Priority client routing
                          </p>
                          <p className="text-xs text-white/60">
                            VIP clients get dedicated artisan assignment
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white/60 hover:text-white"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-white/5">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="rounded border-white/20 bg-white/10"
                        />
                        <div>
                          <p className="text-sm font-medium text-white">
                            Weekend processing
                          </p>
                          <p className="text-xs text-white/60">
                            Enable weekend workflow for urgent requests
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white/60 hover:text-white"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-white/10">
                  <Button
                    variant="outline"
                    // onClick={() => setIsWorkflowModalOpen(false)}
                    className="flex-1 border-white/20 text-white hover:bg-white/10"
                  >
                    Cancel
                  </Button>
                  <Button
                    // onClick={() => setIsWorkflowModalOpen(false)}
                    className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Workflow Configuration
                  </Button>
                </div>
              </div>
    </div>
  )
}

export default CustomRequest;
