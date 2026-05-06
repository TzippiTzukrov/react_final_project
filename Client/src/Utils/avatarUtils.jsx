const AVATAR_COLORS = [
  '#0a66c2',
  '#057642',
  '#8f5849',
  '#7b68ee',
  '#ff6b6b',
  '#4ecdc4',
  '#45b7d1',
  '#f39c12'
];

export const getAvatarColor = (name) => {
  if (!name) return AVATAR_COLORS[0];
  const index = name.charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
};

export const getInitial = (name) => {
  return name?.charAt(0).toUpperCase() || 'U';
};

export const getInitials = (name) => {
  if (!name) return 'U';
  
  const parts = name.trim().split(' ');
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};