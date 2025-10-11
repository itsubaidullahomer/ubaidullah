import React from "react";

function ProjectModal({ project, isOpen, onClose }) {
  if (!isOpen) return null;
 console.log(project,'project')
  const hasExtendedInfo = project.fullDescription || project.features || project.metrics;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#011221] border-2 border-[#1E2D3D] rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-lg bg-[#1C2B3A] hover:bg-[#263B4A] border border-[#1E2D3D] text-[#607B96] hover:text-white transition-all"
        >
          <i className="ri-close-line text-2xl"></i>
        </button>

        {/* Header */}
        <div className="relative border-b border-[#1E2D3D] bg-gradient-to-r from-[#011221] to-[#01162180]">
          <div className="p-6 sm:p-8">
            <div className="flex items-start gap-3 mb-3">
              <span className="px-3 py-1 rounded-full bg-[#1C2B3A] border border-[#5565E8]/30 text-[#5565E8] text-sm font-semibold">
                {project.role || "Featured Project"}
              </span>
              {project.duration && (
                <span className="px-3 py-1 rounded-full bg-[#1C2B3A]/50 border border-[#607B96]/20 text-[#607B96] text-sm">
                  {project.duration}
                </span>
              )}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              {project.title}
            </h2>
            <p className="text-[#607B96] text-lg leading-relaxed mb-4">
              {project.fullDescription || project.desc}
            </p>
            {project.impact && (
              <div className="p-4 rounded-lg bg-[#5565E8]/10 border border-[#5565E8]/20">
                <p className="text-[#5565E8] text-sm font-medium flex items-start gap-2">
                  <i className="ri-lightbulb-flash-line text-lg mt-0.5"></i>
                  <span>{project.impact}</span>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Image Preview */}
        <div className="relative overflow-hidden bg-[#010C15]">
          <img 
            src={project.src} 
            alt={project.title}
            className="w-full h-[300px] sm:h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#011221] via-transparent to-transparent pointer-events-none"></div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Key Metrics - Only if available */}
          {project.metrics && project.metrics.length > 0 && (
            <div>
              <h3 className="text-[#5565E8] font-semibold text-lg mb-3 flex items-center gap-2">
                <i className="ri-bar-chart-box-line"></i>
                Key Metrics & Impact
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {project.metrics.map((metric, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-[#01162180] border border-[#1E2D3D] hover:border-[#5565E8]/30 transition-all"
                  >
                    <p className="text-white text-sm font-medium">{metric}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Features - Only if available */}
          {project.features && project.features.length > 0 && (
            <div>
              <h3 className="text-[#5565E8] font-semibold text-lg mb-3 flex items-center gap-2">
                <i className="ri-star-line"></i>
                Key Features
              </h3>
              <div className="space-y-2">
                {project.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-[#01162180] border border-[#1E2D3D] hover:border-[#5565E8]/30 transition-all"
                  >
                    <i className="ri-checkbox-circle-line text-[#5565E8] text-xl mt-0.5"></i>
                    <span className="text-[#607B96] text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies */}
          <div>
            <h3 className="text-[#5565E8] font-semibold text-lg mb-3 flex items-center gap-2">
              <i className="ri-code-s-slash-line"></i>
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {(project.technologies || project.category).map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-lg bg-[#1C2B3A] border border-[#1E2D3D] text-[#607B96] hover:text-white hover:border-[#5565E8]/50 transition-all text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Highlights - Only if available */}
          {project.highlights && project.highlights.length > 0 && (
            <div>
              <h3 className="text-[#5565E8] font-semibold text-lg mb-3 flex items-center gap-2">
                <i className="ri-flashlight-line"></i>
                Project Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg bg-[#01162180] border border-[#1E2D3D]"
                  >
                    <i className="ri-arrow-right-s-line text-[#5565E8] text-xl"></i>
                    <span className="text-[#607B96] text-sm">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Default Features (fallback if no extended info) */}
          {!hasExtendedInfo && (
            <div>
              <h3 className="text-[#5565E8] font-semibold text-lg mb-3 flex items-center gap-2">
                <i className="ri-star-line"></i>
                Key Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Modern UI/UX Design",
                  "Responsive Layout",
                  "Optimized Performance",
                  "Cross-browser Compatible"
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg bg-[#01162180] border border-[#1E2D3D]"
                  >
                    <i className="ri-check-line text-[#5565E8] text-xl"></i>
                    <span className="text-[#607B96] text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4">
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="flex-1 min-w-[200px] flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#5565E8] hover:bg-[#6575F0] text-white font-medium transition-all shadow-lg shadow-[#5565E8]/20 hover:shadow-[#5565E8]/40"
            >
              <i className="ri-external-link-line"></i>
              Visit Live Site
            </a>
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-lg bg-[#1C2B3A] hover:bg-[#263B4A] border border-[#1E2D3D] text-[#607B96] hover:text-white font-medium transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;