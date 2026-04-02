import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { RiDownloadLine } from "@remixicon/react";
import { parseEmails } from "@/lib/utils";
import { generateScript } from "@/lib/powershell";

// ─── Quick generator (embedded) ───────────────────────────────────────────────

const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

export function QuickGeneratorCard() {
  const [userEmail, setUserEmail] = useState("");
  const [senderEmail, setSenderEmail] = useState("");

  const valid = EMAIL_RE.test(senderEmail.trim());

  const handleDownload = useCallback(() => {
    if (!valid) return;
    const parsed = parseEmails(senderEmail);
    const validParsed = parsed.filter((e) => e.valid);
    if (!validParsed.length) return;
    const domain = validParsed[0].domain.split(".")[0] || validParsed[0].alias;
    const ps1 = generateScript(
      validParsed,
      userEmail,
      domain,
      "copy",
      "senderEmail"
    );
    const blob = new Blob([ps1], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    Object.assign(document.createElement("a"), {
      href: url,
      download: "outlook-rules.ps1",
    }).click();
    URL.revokeObjectURL(url);
  }, [senderEmail, userEmail, valid]);

  const inputCls =
    "block w-full rounded-[4px] border border-[#e5edf5] dark:border-slate-600 bg-white dark:bg-slate-900 px-4 py-3 text-[16px] font-[300] text-[#061b31] dark:text-slate-100 placeholder-[#64748d] dark:placeholder-slate-500 transition focus:border-[#533afd] dark:focus:border-[#533afd] focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-[rgba(83,58,253,0.1)] dark:focus:ring-[rgba(83,58,253,0.2)]";

  return (
    <div className="mx-auto max-w-lg rounded-[6px] bg-white dark:bg-slate-800 border border-[#e5edf5] dark:border-slate-700 shadow-[rgba(50,50,93,0.25)_0px_30px_45px_-30px,rgba(0,0,0,0.1)_0px_18px_36px_-18px] p-6 sm:p-8">
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label
            htmlFor="hq-user-email"
            className="block text-[11px] font-[400] uppercase tracking-wide text-[#273951] dark:text-slate-300"
          >
            Your M365 Email
          </label>
          <input
            id="hq-user-email"
            type="email"
            autoComplete="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="you@company.com"
            className={inputCls}
          />
          <p className="text-xs text-slate-400 dark:text-slate-400">
            Used for folder paths in the script. Leave blank to auto-detect.
          </p>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="hq-sender-email"
            className="block text-[11px] font-[400] uppercase tracking-wide text-[#273951] dark:text-slate-300"
          >
            Sender Email
          </label>
          <input
            id="hq-sender-email"
            type="email"
            autoComplete="off"
            value={senderEmail}
            onChange={(e) => setSenderEmail(e.target.value)}
            placeholder="noreply@github.com"
            className={inputCls}
            onKeyDown={(e) => {
              if (e.key === "Enter" && valid) handleDownload();
            }}
          />
          <p className="text-xs text-slate-400 dark:text-slate-400">
            The address you want to create a rule for.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap text-[11px] text-slate-400 dark:text-slate-400 pt-1">
          <span>📂 Inbox subfolder</span>
          <span className="text-slate-300 dark:text-slate-600">·</span>
          <span>📋 Copy</span>
          <span className="text-slate-300 dark:text-slate-600">·</span>
          <span>🎯 Exact match</span>
        </div>

        <button
          onClick={handleDownload}
          disabled={!valid}
          className="w-full flex items-center justify-center gap-2 rounded-[4px] bg-[#533afd] px-4 py-2.5 text-[16px] font-[400] text-white hover:bg-[#4434d4] active:bg-[#2e2b8c] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <RiDownloadLine className="size-4" />
          Download Rules
        </button>

        <p className="text-center text-xs text-slate-400 dark:text-slate-400">
          Need more options?{" "}
          <Link
            to="/advanced"
            className="font-[400] text-[#533afd] dark:text-[#b9b9f9] hover:text-[#4434d4] dark:hover:text-white underline underline-offset-2"
          >
            Try Advanced mode →
          </Link>
        </p>
      </div>
    </div>
  );
}
