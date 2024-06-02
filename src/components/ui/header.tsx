import { AccountType } from "@/app/page";

interface HeaderProps extends AccountType {}

export const Header = ({ address, balance, chainId, network }: HeaderProps) => {
    return (
      <div className="px-6 md:px-12 sm:px-2">
        <div className="flex justify-between items-centers">
          <div className="flex-1 px-2 mx-2">
            <span>🟢{""}{address ?? "Wallet Address"}</span>
          </div>
          <div className="flex gap-8 items-center text-transparent bg-gradient-to-br bg-clip-text from-teal-500 via-indigo-500 to-sky-500 dark:from-teal-200 dark:via-indigo-300 dark:to-sky-500 ">
            <span>{balance ?? "Balance"}</span>
            <span>{chainId ?? "Chain Id"}</span>
            <span>{network ?? "Network"}</span>
          </div>
        </div>
      </div>
    );
  };