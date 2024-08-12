export interface LevelElo {
  level: number;
  from: number;
  to?: number;
}

export class EloUtil {
  // Reference: https://support.faceit.com/hc/en-us/articles/10525200579740-FACEIT-CS2-Elo-and-skill-levels
  static readonly LEVEL_ELO: LevelElo[] = [
    {
      level: 1,
      from: 100,
      to: 500,
    },
    {
      level: 2,
      from: 501,
      to: 750,
    },
    {
      level: 3,
      from: 751,
      to: 900,
    },
    {
      level: 4,
      from: 901,
      to: 1050,
    },
    {
      level: 5,
      from: 1051,
      to: 1200,
    },
    {
      level: 6,
      from: 1201,
      to: 1350,
    },
    {
      level: 7,
      from: 1351,
      to: 1530,
    },
    {
      level: 8,
      from: 1531,
      to: 1750,
    },
    {
      level: 9,
      from: 1751,
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
