import { randomBytes, createHash } from 'crypto';

export class CredentialManager {
  /**
   * Generates a cryptographically secure random credential public ID.
   * This is what goes into the QR code and barcode.
   */
  static generateCredentialPublicId(): string {
    // Generate 16 bytes (32 hex characters)
    return randomBytes(16).toString('hex');
  }

  /**
   * Hashes the credential if we want to store a hash for verification.
   * Currently, we can just use the public ID directly for lookups.
   */
  static hashCredential(credential: string): string {
    return createHash('sha256').update(credential).digest('hex');
  }

  /**
   * Generates the next sequential Employee ID like NX0001
   */
  static generateEmployeeId(lastId?: string): string {
    if (!lastId) {
      return 'NX0001';
    }
    
    // Extract the numeric part
    const match = lastId.match(/NX(\d+)/);
    if (!match) {
      return 'NX0001';
    }

    const nextNumber = parseInt(match[1], 10) + 1;
    // Pad with zeros to minimum 4 digits
    const paddedNumber = nextNumber.toString().padStart(4, '0');
    return `NX${paddedNumber}`;
  }
}
