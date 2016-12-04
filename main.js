// Initialize Phaser, and creates a 400x490px game
var game = new Phaser.Game(400, 490, Phaser.AUTO, 'game_div');

// Creates a new 'main' state that wil contain the game
var main_state = {

    preload: function() { 
		// Function called first to load all the assets
		 // сменим фон игры
		this.game.stage.backgroundColor = '#22A7F0';

		// загрузим картинку Птички
		this.game.load.image('bird', 'assets/plane.svg');

        // загрузим трубу
		this.game.load.image('pipe', 'assets/orange-block3.png');   


    },

    create: function() { 
    	// Fuction called after 'preload' to setup the game    

    	// покажем птичку на экране
    	this.bird = this.game.add.sprite(100, 245, 'bird');

    	// добавим гравитацию, заставив птичку падать вниз
    	this.bird.body.gravity.y = 1000;


    	// добавим функцию jump в качестве обработчика нажатия пробела
    	var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    	space_key.onDown.add(this.jump, this);  


    	// сделать 20 копий труб в группе
    	this.pipes = game.add.group();  
    	this.pipes.createMultiple(20, 'pipe');

    	// вызывать функцию add_row_of_pipes() каждые 1.5 
    	this.timer = this.game.time.events.loop(1500, this.add_row_of_pipes, this);
    	

    	// show scores
    	this.score = 0;
    	var style = { front: "30px Arial", fill: '#fff'};
    	this.label_score = this.game.add.text(20, 20, '0', style);

    },
    
    update: function() {
		// Function called 60 times per second

	    // если птичка вылетела за пределы экрана (слишком высоко или слишком низко),
		// то необходимо вызвать функцию restart_game
		if (this.bird.inWorld == false)
			this.restart_game();

		// when hit pipe  - restart the game
		this.game.physics.overlap(this.bird, this.pipes, this.restart_game, null, this);
    },



    // поможем птичке подпрыгнуть
    jump: function() {  
        // добавляем вертикальную скорость птице
        this.bird.body.velocity.y = -350;
        // this.bird.body.velocity.y = -100;
    },

    // начинаем игру заново
    restart_game: function() {  
        // останавливающую таймер
    	this.game.time.events.remove(this.timer);
        // запускаем состояние "main", которое перезапускает игру
        this.game.state.start('main');
    },


    add_one_pipe: function(x, y) {  
        // получаем первую неиспользованную трубу из группы
        var pipe = this.pipes.getFirstDead();

        // позиционируем трубу на игровом поле
        pipe.reset(x, y);

        // добавим скорость трубе, чтобы она двигалась влево
        pipe.body.velocity.x = -200; 

        // удаляем трубу, когда она становится невидимой
        pipe.outOfBoundsKill = true;
    },

    // add_row_of_pipes: function() {
    //     var hole = Math.floor(Math.random()*5) + 1;

    //     // add one more score
    //     this.score += 1;
    //     this.label_score.content = this.score;

    //     for (var i = 0; i < 8; i++) {
    //         if (i !== hole && i !== (hole + 1)) {
    //             this.add_one_pipe(400, i*60 + 10);


    //         }
    //     }
    // },


    add_row_of_pipes: function() {
        var hole = Math.floor(Math.random()*5) + 1;

        // add one more score
        this.score += 1;
        this.label_score.content = this.score;

        for (var i = 0; i < 8; i++) {
            if (i !== hole && i !== (hole + 1)) {
                this.add_one_pipe(400, i*60 + 3);
            }
        }
    },





};

// Add and start the 'main' state to start the game
game.state.add('main', main_state);  
game.state.start('main'); 