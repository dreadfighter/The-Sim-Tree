addLayer("cp", {
    name: "Challenge Points", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "CP", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		power: new Decimal(0),
		gainy: new Decimal(1),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Challenge Points",
effectDescription() {
return "Endgame: 128th Challenge, each 5 of Challenge Points forming a challenge (scales up to 25 after 2nd challenge"},	// Name of prestige currency
    baseResource: "particles", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.55, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if (inChallenge("dr", 11)) mult = mult.div(1.74)
		if (inChallenge("dr", 12)) mult = mult.div(2.36)	
		if (inChallenge("dr", 13)) mult = mult.div(2.84)
if (challengeCompletions("e", 12) >= 5) mult = mult.mul(2)
if (challengeCompletions("e", 12) >= 6) mult = mult.mul(2.48)	
if (challengeCompletions("e", 12) >= 7) mult = mult.mul(2)	
if (challengeCompletions("e", 12) >= 8) mult = mult.mul(2)	
if (challengeCompletions("e", 12) >= 9) mult = mult.mul(2)	
	if (player.cm.unlocked) mult = mult.mul(10)
			if (player.mf.unlocked) mult = mult.mul(10)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
		challenges: {
    11: {
        name: "1. Pointer",
						completionLimit: 1,
        challengeDescription: "Point gain is x1.6 faster.",
        canComplete: function() {return player.points.gte(32)},
		unlocked() {return true},
		goalDescription: " 32 Particles",
		rewardDescription() { let r = player.dr.power.pow(0.35).times(6).add(50)
		if (challengeCompletions("e", 12) >= 4) return "Point gain is boosted by power amount. Currently: " + format(r) + "x"
		else return "Point gain is x20.15 faster"},
    },
	    12: {
        name: "2. Booster",
						completionLimit: 1,
        challengeDescription: "Point gain is slower by CP amount",
        canComplete: function() {if (player.cm.unlocked) return player.points.gte(116)
			else return player.points.gte(232)},
		unlocked() { if (inChallenge('cm', 11)) return false
			else return player.cp.points.gte(5)},
		goalDescription() { if (player.cm.unlocked) return " 116 Particles"
		else return " 232 Particles"},
		rewardDescription() { let r =  challengeCompletions("e", 12)
		if (hasChallenge("cp", 22)) return "Point amount boosts themselves gain. Currently: " + format(player.points.pow(0.34).add(4).times(2)) + "x"
		if (r == 3) return "Point amount boosts themselves gain. Currently: " + format(player.points.pow(0.34).add(4)) + "x"
			else return "Point amount boosts themselves gain. Currently: " + format(player.points.pow(0.24).add(1)) + "x"},
    },
		    13: {
        name: "3. Scaler",
						completionLimit: 1,
        challengeDescription: "Divides point gain by completed challenges",
        canComplete: function() {return player.points.gte(630)},
		unlocked() {return player.cp.points.gte(25)},
		goalDescription: " 630 Particles",
		rewardDescription: "Unlock a new layer",
    },
			    21: {
        name: "25. Exponentialer",
						completionLimit: 1,
        challengeDescription: "Point gain ^0.65 slower",
        canComplete: function() {return player.points.gte(5000000)},
		unlocked() {return hasChallenge('cm', 12)},
		goalDescription: " 5M Particles",
		rewardDescription: "Point gain ^1.2",
    },
				    22: {
        name: "26. Gainer",
						completionLimit: 1,
        challengeDescription: "This challenge contains twiced <b>Pointer</b>, <b>Exponentialer</b> conditions",
        canComplete: function() {return player.points.gte(20000)},
		unlocked() {return hasChallenge('cm', 12)},
		goalDescription: " 20K Particles",
		rewardDescription: "Double <b>Booster</b> effect",
    },
},
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "c: Reset for Challenge Points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
				passiveGeneration() {			
return (hasChallenge("cm", 12)?0.1:0)
  },
	layerShown(){return true},
})
addLayer("dr", {
    name: "Dimensional Rift", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "DR", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		power: new Decimal(0),
    }},
    color: "#523e8b",
    requires: new Decimal(75), // Can be a function that takes requirement increases into account
    resource: "Dimensional Rift",	// Name of prestige currency
    baseResource: "challenge points",
	effectDescription() {if (inChallenge("e", 12)) return " which provides " + format(player.dr.power) + " Power, which gains " + format(player.dr.power.pow(0.15).times(5)) + "x to point gain" 
		else return " which provides " + format(player.dr.power) + " Power, which gains " + format(player.dr.power.pow(0.15)) + "x to point gain" 
	},
branches: ["cp"],	// Name of resource prestige is based on
    baseAmount() {return player.cp.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.01, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
		challenges: {
    11: {
        name: "4. 1st dimension",
						completionLimit: 1,
        challengeDescription: "CP gain is 1.74x slower",
        canComplete: function() {return player.cp.points.gte(45)},
		unlocked() {
			return true},
		goalDescription: " 45 Challenge Points",
		rewardDescription(){ return "Unlock next dimension and boost point gain by CP amount. Currently: x" + format(player.cp.points.pow(1.15).add(2))},
    },
	    12: {
        name: "5. 2nd dimension",				
		completionLimit: 1,
        challengeDescription: "CP gain is 2.36x slower and point gain is 1.27x slower",
        canComplete: function() {return player.cp.points.gte(75)},
		unlocked() {return hasChallenge("dr", 11)},
		goalDescription: " 75 Challenge Points",
		rewardDescription: "Unlock challenge and provide 2.15x boost to point gain",
    },
		    13: {
        name: "6. 3rd dimension",
						completionLimit: 1,
        challengeDescription: "CP gain is 2.84x slower and point gain is 1.35x slower",
        canComplete: function() {return player.cp.points.gte(145)},
		unlocked() {
			return hasChallenge("dr", 12)},
		goalDescription: " 145 Challenge Points",
		rewardDescription: "Unlock next challenge and upgrade <b>Power</b> effect",
    },
		    21: {
        name: "13. Collapse all dimensions",
						completionLimit: 1,
        challengeDescription: "Just click at this challenge",
        canComplete: function() {return player.cp.points.gte(0)},
		unlocked() {return (hasChallenge("dr", 13))},
		goalDescription: " 0 Challenge Points",
		rewardDescription: "Unlock a new layer, but destroy this layer",
    },
},
update(diff) {
	if (player.dr.unlocked) return player.dr.power = player.dr.power.add(diff)
},
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "d", description: "d: Reset for Dimensional Rift", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	layerShown(){if (hasChallenge('dr', 21) || player.e.unlocked) return "ghost"
		return (hasChallenge("cp", 13) || player[this.layer].unlocked)},
})
addLayer("e", {
    name: "Emptiness", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#484d5b",
    requires: new Decimal(1000), // Can be a function that takes requirement increases into account
    resource: "Emptiness",	// Name of prestige currency
    baseResource: "challenge points",
branches: ["cp"],	// Name of resource prestige is based on
    baseAmount() {return player.cp.points},
effectDescription() { let eff = player.dr.power.pow(0.15).times(5)
let eff2 = player.dr.power.pow(0.15).add(11)
		if (inChallenge("e", 12) && (challengeCompletions("e", 12) == 2)) return " Power boost - " + format(player.dr.power.pow(0.35).times(5)) + "x"
				if (inChallenge("e", 12) && (challengeCompletions("e", 12) == 1)) return " Power boost - " + format(eff) + "x"
	if (challengeCompletions("e", 12) >= 2) return " Power boost - " + format(eff2.times(13.45)) + "x"
	if (challengeCompletions("e", 12) == 1) return " Power boost - " + format(eff2) + "x"
	if (inChallenge("e", 12)) return " Power boost - " + format(eff) + "x"
	else return " Power boost - " + format(player.dr.power.pow(0.15)) + "x"},	// Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.31, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
	challenges: {
		    11: {
        name: "14. Collect dust",
				completionLimit: 1,
        challengeDescription: "There are nothing that can slow down your production",
        canComplete: function() {return player.cp.points.gte(260)},
		unlocked() { if (inChallenge('cm', 12)) return false
			else return player.e.unlocked},
		goalDescription: " 260 Challenge Points",
		rewardDescription: "Unlock an <b>Expedition</b> levelling challenge",
    },
			    12: {
        name() { let comps = this.completionLimit
		if (challengeCompletions("e", 12) >= 9) return "22. Expedition X"
						if (challengeCompletions("e", 12) == 8) return "21. Expedition IX"
		if (challengeCompletions("e", 12) == 7) return "20. Expedition VIII"
				if (challengeCompletions("e", 12) == 6) return "21. Expedition VII"
		if (challengeCompletions("e", 12) == 5) return "20. Expedition VI"
				if (challengeCompletions("e", 12) == 4) return "19. Expedition V"
		if (challengeCompletions("e", 12) == 3) return "18. Expedition IV"
		if (challengeCompletions("e", 12) == 2) return "17. Expedition III"
		if (challengeCompletions("e", 12) == 1) return "16. Expedition II"
			else return "15. Expedition"},
		completionLimit: 10,
        challengeDescription() { let comps = this.completionLimit
			if (challengeCompletions("e", 12) == 10) return "Gather Planets. <b>Power</b> effect is boosted. Finished " + format(challengeCompletions("e", 12)) + " / "+ format(comps) + " Expeditions"
					if (challengeCompletions("e", 12) == 9) return "Gather Stars. <b>Power</b> effect is boosted. Finished " + format(challengeCompletions("e", 12)) + " / "+ format(comps) + " Expeditions"
								if (challengeCompletions("e", 12) == 8) return "Gather Space. <b>Power</b> effect is boosted. Finished " + format(challengeCompletions("e", 12)) + " / "+ format(comps) + " Expeditions"
											if (challengeCompletions("e", 12) == 7) return "Gather Diamonds. <b>Power</b> effect is boosted. Finished " + format(challengeCompletions("e", 12)) + " / "+ format(comps) + " Expeditions"
														if (challengeCompletions("e", 12) == 6) return "Gather Platinum. <b>Power</b> effect is boosted. Finished " + format(challengeCompletions("e", 12)) + " / "+ format(comps) + " Expeditions"
																	if (challengeCompletions("e", 12) == 5) return "Gather Silver. <b>Power</b> effect is boosted. Finished " + format(challengeCompletions("e", 12)) + " / "+ format(comps) + " Expeditions"
																				if (challengeCompletions("e", 12) == 4) return "Gather Gold. <b>Power</b> effect is boosted. Finished " + format(challengeCompletions("e", 12)) + " / "+ format(comps) + " Expeditions"
																							if (challengeCompletions("e", 12) == 3) return "Gather Iron. <b>Power</b> effect is boosted. Finished " + format(challengeCompletions("e", 12)) + " / "+ format(comps) + " Expeditions"
			if (challengeCompletions("e", 12) == 2) return "Gather Coal. <b>Power</b> effect is boosted. Finished " + format(challengeCompletions("e", 12)) + " / "+ format(comps) + " Expeditions"
			else return "Gather Sand. x5.00 <b>Power</b> boost. Finished " + format(challengeCompletions("e", 12)) + " / "+ format(comps) + " Expeditions"},
        canComplete: function() { 
			if (challengeCompletions("e", 12) == 9) return player.cp.points.gte(6455783)
				if (challengeCompletions("e", 12) == 8) return player.cp.points.gte(1235354)
					if (challengeCompletions("e", 12) == 7) return player.cp.points.gte(368344)
						if (challengeCompletions("e", 12) == 6) return player.cp.points.gte(124000)
							if (challengeCompletions("e", 12) == 5) return player.cp.points.gte(74320)
								if (challengeCompletions("e", 12) == 4) return player.cp.points.gte(45320)
									if (challengeCompletions("e", 12) == 3) return player.cp.points.gte(26720)
										if (challengeCompletions("e", 12) == 2) return player.cp.points.gte(7420)
		if (challengeCompletions("e", 12) == 1) return player.cp.points.gte(2350) 
			else return player.cp.points.gte(1450)},
		unlocked() { if (inChallenge('cm', 12)) return false
			else return hasChallenge("e", 11)},
		goalDescription() { 
		if (challengeCompletions("e", 12) == 9) return " 6.45M Challenge Points"
		if (challengeCompletions("e", 12) == 8) return " 1.23M Challenge Points"
		if (challengeCompletions("e", 12) == 7) return " 368.344 Challenge Points"
		if (challengeCompletions("e", 12) == 6) return " 124.000 Challenge Points"
		if (challengeCompletions("e", 12) == 5) return " 74320 Challenge Points"
		if (challengeCompletions("e", 12) == 4) return " 45320 Challenge Points"
		if (challengeCompletions("e", 12) == 3) return " 26720 Challenge Points"
		if (challengeCompletions("e", 12) == 2) return " 7420 Challenge Points"
		if (challengeCompletions("e", 12) == 1) return " 2350 Challenge Points"
			else return " 1450 Challenge Points"},
		rewardDescription() {let r = challengeCompletions("e", 12)
		if (r == 9) return "Adds additional boost to Challenge Point gain. Currently: 19.84x"
		if (r == 8) return "Adds additional boost to Challenge Point gain. Currently: 9.92x"
if (r == 7) return "Adds additional boost to Challenge Point gain. Currently: 4.96x"
if (r == 6) return "After Expedition VII each completion adds additional boost to Challenge Point gain. Currently: 2.48x"
if (r == 5) return "Double Challenge point gain"
if (r == 4) return "Add effect to <b>1. Pointer</b> challenge"
if (r == 3) return "The <b>2. Booster</b> effect is Way better"
if (r == 2) return "Adds 13.45x multiplier to the Power effect base"
if (r == 1) return "Add + 1" + format(r) + " to the Power effect base"},
    },
	},
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "e", description: "e: Reset for Emptiness", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
								doReset(resettingLayer) {
				if (hasChallenge("dr", 21) && resettingLayer=="dr") keep.push("challenges");
		},
	layerShown(){return (hasChallenge("dr", 13) || player[this.layer].unlocked)},
})
addLayer("cm", {
    name: "Challenge Matter", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "CM", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#f0ce4d",
    requires: new Decimal(10000000), // Can be a function that takes requirement increases into account
    resource: "Challenge Matter",	// Name of prestige currency
    baseResource: "challenge points",
	branches: ["e"],
effectDescription() {return "which unlocks "+ format(player.cm.points) +" challenges and 10.00x to challenge points gain"},	// Name of resource prestige is based on
    baseAmount() {return player.cp.points},	// Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 6, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
	challenges: {
				    11: {
        name: "23. Create Matter fabric",
				completionLimit: 1,
        challengeDescription: "When you in this challenge, your point gain is 15.00x faster but you cant enter <b>2. Booster</b> challenge",
        canComplete: function() {return (player.points.gte(100000000) || player.mf.unlocked)},
		unlocked() {
			return player.cm.points.gte(1)},
		goalDescription: " 100M Points but after Matter Fabric is unlocked you can auto-finish this challenge.",
		rewardDescription: "Unlock a new layer",
    },
					    12: {
        name: "24. No Emptiness",
				completionLimit: 1,
        challengeDescription: "You can't enter <b>Emptiness</b> challenges.",
        canComplete: function() {return (player.points.gte(100000))},
		unlocked() {
			return player.cm.points.gte(2)},
		goalDescription: " 100000 Points",
		rewardDescription: "Unlock a new row of Challenge Power challenges and gain 10% of Challenge Points on reset",
    },
	},
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "m: Reset for Challenge Matter", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
								doReset(resettingLayer) {
				if (hasChallenge("dr", 21) && resettingLayer=="dr") keep.push("challenges");
		},
	layerShown(){let r = challengeCompletions("e",12)
		return (r == 10 || player[this.layer].unlocked)},
})
addLayer("mf", {
    name: "Matter Fabric", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "MF", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#5b5b5b",
	nodeStyle() {
		return {
			'background': 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(0,0,0,1) 100%)',
		}
	},
	effectDescription() {
		return "which gains 10.00x to challenge points gain"
	},
    requires: new Decimal(5), // Can be a function that takes requirement increases into account
    resource: "Matter Fabric",	// Name of prestige currency
    baseResource: "challenge matter",
	branches: ["e"],	// Name of resource prestige is based on
    baseAmount() {return player.cm.points},	// Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.31, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
	challenges: {
	},
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "f", description: "f: Reset for Matter Factories", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
								doReset(resettingLayer) {
				if (hasChallenge("dr", 21) && resettingLayer=="dr") keep.push("challenges");
		},
	layerShown(){let r = challengeCompletions("e",12)
		return (hasChallenge('cm', 11) || player[this.layer].unlocked)},
})