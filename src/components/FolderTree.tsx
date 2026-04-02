interface FolderTreeProps {
  aliases: string[]
  parentFolder: string
}

export function FolderTree({ aliases, parentFolder }: FolderTreeProps) {
  return (
    <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-100 dark:border-slate-800/80 gap-3">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-200 whitespace-nowrap">Folder Structure Preview</h2>
        <span className="text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap">{aliases.length} folder{aliases.length !== 1 ? 's' : ''} will be created</span>
      </div>

      <div className="px-4 sm:px-6 py-5 font-mono text-sm overflow-x-auto">
        {/* Inbox root */}
        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
          <span>📥</span>
          <span className="text-slate-700 dark:text-slate-300 font-medium">Inbox</span>
        </div>

        {/* Parent folder */}
        <div className="ml-4 mt-1">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <span className="text-slate-300 dark:text-slate-600 select-none">└──</span>
            <span>📁</span>
            <span className="text-[#533afd] dark:text-[#b9b9f9] font-medium">{parentFolder}</span>
          </div>

          {/* Alias folders */}
          <div className="ml-6 mt-1 space-y-1">
            {aliases.map((alias, i) => (
              <div key={alias} className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <span className="text-slate-300 dark:text-slate-600 select-none">
                  {i === aliases.length - 1 ? '└──' : '├──'}
                </span>
                <span>📂</span>
                <span className="text-slate-700 dark:text-slate-300">{alias}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/50 px-4 sm:px-6 py-3">
        <p className="text-xs text-slate-400 dark:text-slate-500">
          Emails from each sender will be <strong className="text-slate-600 dark:text-slate-300">copied</strong> into their folder.
          Hit <span className="font-medium text-slate-500 dark:text-slate-400">Generate Script</span> to create the PowerShell script.
        </p>
      </div>
    </div>
  )
}
