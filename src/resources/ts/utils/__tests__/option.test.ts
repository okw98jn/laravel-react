import { toOptions } from '@/utils/options';
import { describe, expect, it } from 'vitest';

describe('toOptions', () => {
  it('数値のvalueを文字列に変換すること', () => {
    const status = {
      valid: { value: 2, label: '有効' },
      invalid: { value: 1, label: '無効' },
    };

    const result = toOptions(status);

    expect(result).toEqual([
      { value: '2', label: '有効' },
      { value: '1', label: '無効' },
    ]);

    // valueが文字列型であることを確認
    for (const option of result) {
      expect(typeof option.value).toBe('string');
    }
  });

  it('文字列のvalueはそのまま保持すること', () => {
    const category = {
      food: { value: 'food', label: '食品' },
      drink: { value: 'drink', label: '飲料' },
    };

    const result = toOptions(category);

    expect(result).toEqual([
      { value: 'food', label: '食品' },
      { value: 'drink', label: '飲料' },
    ]);
  });

  it('value と label 以外のプロパティは除外されること', () => {
    const users = {
      user1: { value: 1, label: 'ユーザー1', id: 'u001', active: true },
      user2: { value: 2, label: 'ユーザー2', id: 'u002', active: false },
    };

    const result = toOptions(users);

    expect(result).toEqual([
      { value: '1', label: 'ユーザー1' },
      { value: '2', label: 'ユーザー2' },
    ]);

    // 余分なプロパティが含まれていないことを確認
    for (const option of result) {
      expect(Object.keys(option)).toEqual(['value', 'label']);
      expect(option).not.toHaveProperty('id');
      expect(option).not.toHaveProperty('active');
    }
  });

  it('空のオブジェクトの場合は空の配列を返すこと', () => {
    const emptyObj = {};
    const result = toOptions(emptyObj);
    expect(result).toEqual([]);
  });
});
