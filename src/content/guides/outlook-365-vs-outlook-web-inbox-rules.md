---
title: "Outlook 365 vs Outlook Web: How Inbox Rules Differ"
description: "Understand the key differences in how Microsoft handles inbox rules across classic desktop Outlook and Outlook on the Web (OWA)."
date: "2026-04-20"
---

# Outlook 365 vs Outlook Web: How Inbox Rules Differ

If you use Outlook on multiple devices, you may have noticed that rules behave confusingly across different versions of the application. Microsoft categorizes rules into two distinct buckets: **Client-only rules** and **Server-side rules**.

## Server-Side Rules
Server-side rules run directly on your Microsoft Exchange server. 
- **The Benefit:** They run 24/7. Even if your computer is completely turned off and Outlook is closed, these rules will route, delete, or reply to emails as soon as they hit your mailbox.
- **Best For:** Moving emails to folders, deleting emails, and marking as read.
- **Platform:** Works seamlessly across Outlook 365 (Desktop), Outlook Web App (OWA), and your mobile device.

## Client-Only Rules
Client-only rules rely on features that exist solely on your local installation of Outlook for Windows.
- **The Drawback:** They ONLY execute when you have the Outlook desktop app running and actively connected to the internet. If you check your email on your phone while your PC is asleep, the rules won't run.
- **Best For:** Playing a specific Windows sound, printing an email, or displaying a local desktop alert.

## How InboxCraft Bridges the Gap

One of the largest benefits of generating rules via [InboxCraft](/), is that we utilize the native `ExchangeOnlineManagement` PowerShell module. 

This guarantees that every single folder mapping and rule you generate is explicitly instantiated as a **Server-Side rule**. Your rules will instantly and automatically harmonize across your desktop, OWA, and mobile apps without ever needing to worry about client-side degradation!
