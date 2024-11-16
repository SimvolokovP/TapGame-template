export interface ITgUser {
  id: number;
  firstName: string;
  lastName?: string;
  username?: string;
  languageCode?: string;
  isPremium?: boolean;
  addedToAttachmentMenu?: boolean;
  allowsWriteToPm?: boolean;
  isBot?: boolean;
  photoUrl?: string;
}
