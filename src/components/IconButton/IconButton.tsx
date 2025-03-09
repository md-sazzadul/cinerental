const IconButton: React.FC<{
  onClick?: () => void;
  icon: string;
  label: string;
  hasBadge?: boolean;
  badgeCount?: number;
}> = ({ onClick, icon, label, hasBadge, badgeCount }) => (
  <button
    className="relative bg-primary/20 dark:bg-primary/[7%] rounded-lg backdrop-blur-[2px] p-1"
    aria-label={label}
    aria-expanded={hasBadge ? "true" : "false"}
    onClick={onClick}
  >
    <img src={icon} width="24" height="24" alt={label} />
    {hasBadge && badgeCount !== undefined && badgeCount > 0 && (
      <span className="absolute -top-2 left-6 bg-[#12CF6F] text-white text-xs rounded-full min-w-[20px] min-h-[20px] flex items-center justify-center">
        {badgeCount}
      </span>
    )}
  </button>
);

export default IconButton;
