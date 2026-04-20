---
title: "How to Create Outlook Rules Automatically"
description: "A complete guide on how to automatically set up Outlook inbox rules without navigating complex menus."
date: "2026-04-20"
---

# How to Create Outlook Rules Automatically

Managing an overflowing inbox is one of the most frustrating parts of the modern workday. Microsoft Outlook provides "Inbox Rules" to help route, organize, and delete incoming emails automatically.

However, doing this through the Outlook desktop or Outlook Web App (OWA) interface is notoriously tedious, requiring 7-10 clicks per single rule.

In this guide, we'll look at the fastest way to generate your inbox rules automatically using InboxCraft.

## The Problem with Manual Rules

Traditionally, if you wanted to route emails from `@github.com` into a "Development" folder, you'd have to:
1. Open Rules and Alerts.
2. Click "New Rule".
3. Select "Apply rule on messages I receive".
4. Select "with specific words in the sender's address".
5. Type out "@github.com".
6. Select "move it to the specified folder".
7. Create or find the folder.
8. Save and apply.

If you have 10, 20, or 50 alert addresses, you'll be clicking for hours.

## The Solution: Automatic Generation

Instead of clicking through menus, you can use [InboxCraft](https://inboxcraft.app/) to bypass the UI completely. InboxCraft is a free generator that takes a plain-text list of email addresses and outputs a secure PowerShell script.

### Step 1: Gather your addresses
Simply copy a list of sender aliases or domains (like `@datadoghq.com` or `alerts@company.com`).

### Step 2: Use the Generator
Go to the [Generator](/advanced), paste your list, and define a parent folder. 

### Step 3: Run the Script
InboxCraft securely generates native Exchange Online commands you can review and run directly in Windows PowerShell. The script connects securely, provisions your folders, and creates all 50 rules in under exactly 3 seconds.

## Security

Because it generates a transparent `.ps1` script, nothing happens behind the scenes. You don't need to give any third-party app access to your mailbox—you simply run a standard Microsoft management snippet on your own machine.

[Generate your Outlook rules now!](/)
