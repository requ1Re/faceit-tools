export interface LevelElo {
  level: number;
  from: number;
  to?: number;
}

export class EloUtil {
  static readonly LEVEL_ELO: LevelElo[] = [
    {
      level: 1,
      from: 1,
      to: 800,
    },
    {
      level: 2,
      from: 801,
      to: 950,
    },
    {
      level: 3,
      from: 951,
      to: 1100,
    },
    {
      level: 4,
      from: 1101,
      to: 1250,
    },
    {
      level: 5,
      from: 1251,
      to: 1400,
    },
    {
      level: 6,
      from: 1401,
      to: 1550,
    },
    {
      level: 7,
      from: 1551,
      to: 1700,
    },
    {
      level: 8,
      from: 1701,
      to: 1850,
    },
    {
      level: 9,
      from: 1851,
      to: 2000,
    },
    {
      level: 10,
      from: 2001,
    },
  ];

  static getEloRangeForLevel(level: number): LevelElo {
    return (
      this.LEVEL_ELO.find((l) => l.level === level) ?? {
        level: -1,
        from: -1,
        to: -1,
      }
    );
  }

  static getPlusMinusEloForNextLevel(level: number, elo: number) {
    const range = this.getEloRangeForLevel(level);
    let previousLevel = undefined;
    let nextLevel = undefined;

    if (level - 1 >= 1) {
      const rangePrevious = this.getEloRangeForLevel(level - 1);
      previousLevel = rangePrevious.to ? rangePrevious.to - elo : undefined;
    }
    if (level + 1 <= 10) {
      const rangeNext = this.getEloRangeForLevel(level + 1);
      nextLevel = rangeNext.from ? rangeNext.from - elo : undefined;
    }

    return {
      previousLevel,
      nextLevel,
    };
  }
}
