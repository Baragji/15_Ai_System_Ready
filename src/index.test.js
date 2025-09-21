const { processMessage, healthCheck } = require('./index');

describe('AI System Ready', () => {
  describe('processMessage', () => {
    test('should process message correctly', () => {
      const result = processMessage('Hello World');
      expect(result).toBe('AI System Ready: Hello World');
    });

    test('should handle empty message', () => {
      const result = processMessage('');
      expect(result).toBe('No message provided');
    });

    test('should handle null message', () => {
      const result = processMessage(null);
      expect(result).toBe('No message provided');
    });

    test('should handle undefined message', () => {
      const result = processMessage(undefined);
      expect(result).toBe('No message provided');
    });
  });

  describe('healthCheck', () => {
    test('should return healthy status', () => {
      const result = healthCheck();
      expect(result.status).toBe('healthy');
      expect(result.version).toBe('1.0.0');
      expect(result.timestamp).toBeDefined();
      expect(new Date(result.timestamp)).toBeInstanceOf(Date);
    });

    test('should return current timestamp', () => {
      const before = new Date();
      const result = healthCheck();
      const after = new Date();
      const timestamp = new Date(result.timestamp);
      
      expect(timestamp.getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(timestamp.getTime()).toBeLessThanOrEqual(after.getTime());
    });
  });
});