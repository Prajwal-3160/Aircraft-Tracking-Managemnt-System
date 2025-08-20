import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./ContactPage.css";

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);
    try {
      await axios.post("http://localhost:8083/api/contact", form);
      setStatus({ type: "success", text: "✅ Message sent successfully!" });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Contact submission error:", err);
      setStatus({ type: "error", text: "❌ Failed to send message. Please try again." });
    }
    setLoading(false);
    setTimeout(() => setStatus(null), 4000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="contact-container">
      <motion.h2
        className="title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        📬 Contact Us
      </motion.h2>

      <motion.p
        className="subtitle"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Have questions or feedback? We’d love to hear from you!
      </motion.p>

      <motion.div
        className="contact-card"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <form onSubmit={handleSubmit}>
          <motion.div className="form-row" variants={itemVariants}>
            <label>Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Your name"
            />
          </motion.div>

          <motion.div className="form-row" variants={itemVariants}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
            />
          </motion.div>

          <motion.div className="form-row" variants={itemVariants}>
            <label>Subject</label>
            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
              placeholder="Subject"
            />
          </motion.div>

          <motion.div className="form-row" variants={itemVariants}>
            <label>Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              placeholder="Write your message..."
              rows={5}
            />
          </motion.div>

          <motion.button
            type="submit"
            className="btn-submit"
            disabled={loading}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            {loading ? <span className="loader"></span> : "Send Message"}
          </motion.button>
        </form>
      </motion.div>

      {status && (
        <motion.div
          className={`toast ${status.type}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          {status.text}
        </motion.div>
      )}
    </div>
  );
};

export default ContactPage;
