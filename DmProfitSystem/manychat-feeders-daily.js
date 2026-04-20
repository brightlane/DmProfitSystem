#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

class ManyChatFeedersDaily {
  constructor() {
    this.outputDir  = path.join(__dirname, 'output', 'manychat');
    this.socialDir  = path.join(__dirname, 'output');
    this.siteUrl    = 'https://bot.yourdomain.com'; // 👈 CHANGE THIS to your real domain

    this.affiliates = [
      'https://manychat.partnerlinks.io/nwkkk7vkps17',
      'https://manychat.partnerlinks.io/98hj6b3pr28k-4znb59',
      'https://manychat.partnerlinks.io/emwcbue22i01-ogcg6e',
      'https://manychat.partnerlinks.io/t8let4hhqtqg-wki14',
      'https://manychat.partnerlinks.io/bbwxetk27f88-64kfxo',
      'https://manychat.partnerlinks.io/bjhrx464venp-rhhbp',
      'https://manychat.partnerlinks.io/8k59yhm0l32j-z7dk2i',
      'https://manychat.partnerlinks.io/sk9ifozlcocn-3j171d',
      'https://manychat.partnerlinks.io/4hllj0cn47y5-w7fish',
      'https://manychat.partnerlinks.io/4xn0uxepdx0d-ujubb',
      'https://manychat.partnerlinks.io/fsbpv50o2t2b-orca59',
      'https://manychat.partnerlinks.io/57bltjtmr5tj-tz7ji'
    ];

    this.countries = ['us','gb','eu','in','au','ca','jp','cn','za','br','mx','ae'];
    this.currenci
