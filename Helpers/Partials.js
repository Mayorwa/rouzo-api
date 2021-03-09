class Partials {
  static getSavingsInterest(months) {
    switch (months) {
      case 3:
        return 3;
      case 6:
        return 6.5;
      case 9:
        return 11;
      case 12:
        return 15;
      default:
        break;
    }
  }

  static getPortfolioInterest(portfolio, months) {
    if (portfolio.toLowerCase() === 'working capital portfolio') {
      switch (months) {
        case 3:
          return 5;
        case 6:
          return 12;
        case 9:
          return 21;
        case 12:
          return 30;
        default:
          break;
      }
    } else if (portfolio.toLowerCase() === 'asset finance portfolio') {
      switch (months) {
        case 3:
          return 3.5;
        case 6:
          return 8;
        case 9:
          return 14;
        case 12:
          return 20;
        default:
          break;
      }
    } else if (portfolio.toLowerCase() === 'women trader portfolio') {
      switch (months) {
        case 3:
          return 7;
        case 6:
          return 15;
        case 12:
          return 31;
        default:
          break;
      }
    }
  }

  static eligibilityOptions(option = null) {
    const options = {
      registrationStatus: [
        {
          id: 1,
          name: 'Limited liability',
          score: 10,
        },
        {
          id: 2,
          name: 'Partnership',
          score: 5,
        },
        {
          id: 3,
          name: 'Business name',
          score: 5,
        },
        {
          id: 4,
          name: 'Not registered',
          score: 0,
        },
      ],

      yearsOfRunning: [
        {
          id: 1,
          name: '0 - 6months',
          score: 0,
        },
        {
          id: 2,
          name: '12 - 18months',
          score: 5,
        },
        {
          id: 3,
          name: '18months - 3years',
          score: 10,
        },
        {
          id: 4,
          name: 'Over 3years',
          score: 15,
        },
      ],

      lastBusinessRevenue: [
        {
          id: 1,
          name: 'Yes',
          score: 10,
        },
        {
          id: 2,
          name: 'No',
          score: 0,
        },
      ],

      accountVerifiable: [
        {
          id: 1,
          name: 'Yes',
          score: 10,
        },
        {
          id: 2,
          name: 'No',
          score: 0,
        },
      ],

      turnover: [
        {
          id: 1,
          name: 'Over 90% of revenue',
          score: 10,
        },
        {
          id: 2,
          name: 'Over 70% of revenue',
          score: 5,
        },
        {
          id: 3,
          name: 'Less than 70% of revenue',
          score: 0,
        },
      ],

      financingRaise: [
        {
          id: 1,
          name: '#100,000-#500,000',
          score: 10,
        },
        {
          id: 2,
          name: '#600,000-#1,000,000',
          score: 5,
        },
        {
          id: 3,
          name: '#1,100,000 - #2,000,000',
          score: 5,
        },
        {
          id: 4,
          name: '#2,000,000 - #5,000,000',
          score: 5,
        },
        {
          id: 5,
          name: 'Over #5,000,000',
          score: 5,
        },
      ],
    };

    if (option) {
      for (const key in options) {
        if (key === option) {
          return options[key];
        }
      }
    } else {
      return options;
    }
  }

  static guarantorsRelationship() {
    return [
      'My mentor',
      'Past client',
      'My Parent',
      'My Sibling',
      'A close friend',
    ];
  }
}

module.exports = Partials;
