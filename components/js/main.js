

window.addEvent('load', function(){


	function Table(cols, rows, sizeCell){
		this.body			  = document.id(document.body);
		this.container		  = document.id('container');
		this.numberRows		  = rows || 8;
		this.numberCols		  = cols || 8;
		this.numberCells	  = this.numberRows * this.numberCols;
		this.cellSize		  = sizeCell || 50;
		this.rows			  = [];
		this.creator		  = document.id('create');
		this.rowsUser		  = document.id('rows_number');
		this.colsUser		  = document.id('cols_number');
	};

	Table.prototype.createTable = function(){
		var self 	 = this;
		var table 	 = new Element('table', { border:0, cellspacing:4, cellpadding:0 });
		this.table   = table;

		for (var counter = 0; counter < self.numberCells; counter++){
			if (counter % self.numberCols === 0){
				self.createRow();
			}
		}
		table.inject(this.container);

	};

	Table.prototype.createRow = function(){
		var self 	= this;
		var cells	= [];
		var row 	= new Element('tr');

		for (var counter = 0; counter < self.numberCols; counter++ ) {
			var cell = new Element('td',{
				html: '',
				width: self.cellSize,
				height: self.cellSize,
				'class':'free'
			}).setStyle('opacity',0);

			cells.push(cell);

		};

		cells.each(function(item, index){
			item.inject(row);
		});

		row.inject(self.table);
		this.rows.push(row);
	};

	Table.prototype.addNumbers = function(){
		var self 		 	= this,
			row 			= 0,
			cell			= 0,
			direction 		= 'right',
			color			= 255,
			colorFont		= 165,
			colorStep		= Math.ceil(color/this.numberCells),
			data			= '',
			delay			= 100,
			cellsOrdered	= [];

		this.rows.each(function(item, index){
			self.rows[index]['cells'] = item.getElements('td');
		});

		for (var x = 0; x < this.numberCells; x++){

			self.rows[row]['cells'][cell].setStyles({
				'background-color':'rgb('+color+','+color+','+color+')',
				'color':'rgb('+colorFont+','+colorFont+','+colorFont+')'
			})
			self.rows[row]['cells'][cell].set('html',x).set('class','ocupied');

			cellsOrdered.push(self.rows[row]['cells'][cell]);

			color    	-= colorStep;
			colorFont   += colorStep;
			data  	 	 = self.findNext(row, cell, direction);
			row 	   	 = data[0];
			cell 	  	 = data[1];
			direction	 = data[2];
		};

		var delayThis = function(item, delayTime){
			setTimeout(
				(function(){
					//item.fade(1)
					item.setStyle('opacity',1)
				}), delayTime);
		};

		cellsOrdered.each(function(item, index){
			delayThis(item, index*delay);
		});


	};

	Table.prototype.findNext = function(row, cell, direction){
		var self = this;
		switch (direction){
			case 'right':
				if(self.rows[row]['cells'][cell+1] && self.rows[row]['cells'][cell+1].get('class') =='free') {
					cell++;
				} else {
					direction	= 'down';
					row++
				}
				break
			case 'down':
				if(self.rows[row+1] && self.rows[row+1]['cells'][cell].get('class') == 'free'){
					row++;
				} else {
					direction = 'left';
					cell--;
				}
				break
			case 'left':
				if(self.rows[row]['cells'][cell-1] && self.rows[row]['cells'][cell-1].get('class') =='free'){
					cell--;
				} else {
					direction = 'up';
					row--;
				}
				break
			case 'up':
				if(self.rows[row-1] && self.rows[row-1]['cells'][cell].get('class') == 'free' ){
					row--;
				} else {
					direction = 'right';
					cell++
				}
				break
		}
		var data = [row, cell, direction];
		return data;
	};

	window.addEvent('domready', function(){
		document.id('create').addEvents({
			click: function(e){
				e.stop();
				var rows = document.id('rows_number').get('value');
				var cols = document.id('cols_number').get('value');
				var size = document.id('size_box').get('value');

				if(!isNaN(rows) && !isNaN(cols)){
					document.id('container').empty();
					var tableNew =  new Table(cols, rows, size);
					tableNew.createTable();
					tableNew.addNumbers();
				}else {
					alert('only numbers pls');
				}
			}
		});
	})

})