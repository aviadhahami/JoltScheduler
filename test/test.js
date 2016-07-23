/**
 * Created by aviad on 7/22/2016.
 */

'use strict';
let chai = require('chai');
let JoltScheduler = require('./../index');

chai.should();

class TestSuite{
	
	// Data structure tests
	static testInsertion() {
		let instance;
		beforeEach(() => {
			// Create a new Rectangle object before every test.
			instance = new JoltScheduler()
		});
		
		describe('Test Insertion',()=>{
			it('Size 0 on init', ()=>{
				instance.size.should.equal(0)
			});
			
			it('Size 1 after insertion',()=>{
				instance.insert({name:'a',st:123,callback:()=>{}})
				instance.size.should.equal(1)
			});
			
			it('Size 10 after insertions',()=>{
				for(let i=0;i<10;i++){
					instance.insert({name:'a'+i,st:i,callback:()=>{}})
				}
				instance.size.should.equal(10)
			});
		})
	}
	static testExtraction(){
		describe('Test Extraction',()=>{
			let instance;
			beforeEach(() => {
				// Create a new Rectangle object before every test.
				instance = new JoltScheduler()
			});
			
			it('Test id existence',()=>{
				let temp = {name:'a',st:123,callback:()=>{}};
				instance.insert(temp);
				(typeof instance.pop()._id).should.equal('string')
			});
			
			it('Test extracted object equality (emit id)',()=>{
				let temp = {name:'a',st:123,callback:()=>{}};
				instance.insert(temp)
				let res = instance.pop()
				temp.name.should.equal(res.name)
				temp.st.should.equal(res.st)
				temp.callback.should.equal(res.callback)
			})
			it('Test insertion of multiple and in-order extraction of few',()=>{
				let temp1 = {name:'a',st:123,callback:()=>{}};
				let temp2 = {name:'b',st:1,callback:()=>{}};
				let temp3 = {name:'c',st:2,callback:()=>{}};
				let temp4 = {name:'d',st:123234,callback:()=>{}};
				instance.insert(temp1)
				instance.insert(temp2)
				instance.insert(temp3)
				instance.insert(temp4)
				
				// Order should be --> b,c,a,d
				instance.pop().name.should.equal('b')
				instance.pop().name.should.equal('c')
				instance.pop().name.should.equal('a')
			})
			it('Test size after insertion of 10 and extraction of 3',()=>{
				for(let i=0;i<10;i++){
					instance.insert({name:'a'+i,st:i,callback:()=>{}})
				}
				instance.size.should.equal(10)
				instance.pop()
				instance.size.should.equal(9)
				instance.pop()
				instance.pop()
				instance.size.should.equal(7)
				
			})
			
		})
		
	}
	static testInit(){
		describe('Test Initialization', ()=>{
			it('Private HashedMinHeap', ()=>{
				let instance = new JoltScheduler();
				'undefined'.should.equal(typeof instance.dataSet)
			})
		})
	}
	
	// Execution tests
	
	static testStandardExecution() {
		let instance;
		beforeEach(() => {
			// Create a new Rectangle object before every test.
			instance = new JoltScheduler()
		});
		describe('Standard task insertion and execution',()=>{
			it('Insertion of task (500ms delayed)',function(done){

				// Create delay of 3 sec
				let time = new Date();
				time.setSeconds(time.getSeconds() + 0.5);

				// Set variable to test callback against
				let toModify = null;

				// Callback will modify the var from null to {}
				let callback = function(){
					toModify = true;
				};
				let task = {name:'task', st:time.getTime(), callback:callback};
				instance.insert(task);

				setTimeout(function(){
					// Test execution
					true.should.equal(toModify);
					done(); // Wait for timeout
				},501);
			});
			it('Insertion of 2 tasks, (1500ms delay)',function(done){

				// Create delay of 3 sec
				let time_a = new Date();
				let time_b = new Date();
				time_a.setSeconds(time_a.getSeconds() + 1.5);
				time_b.setSeconds(time_b.getSeconds() + 1.7);

				// Set variables to test callback against
				let toModifyA = null;
				let toModifyB = null;

				// Callback will modify the var from null to {}
				let callback_a = function(){
					toModifyA = true;
				};
				let callback_b = function(){
					toModifyB = false;
				};
				let task_a = {name:'task A', st:time_a.getTime(), callback:callback_a};
				let task_b = {name:'task B', st:time_b.getTime(), callback:callback_b};
				instance.insert(task_a);
				instance.insert(task_b);

				setTimeout(function(){
					// Test execution
					true.should.equal(toModifyA);
					false.should.equal(toModifyB);
					done(); // Wait for timeout
				},501);
			})
		})
		describe('Execution races',()=>{
			it('Insert task, then insert sooner task',function(done){
				
				// Create delay of 3 sec
				let time_a = new Date();
				let time_b = new Date();
				time_a.setSeconds(time_a.getSeconds() + 1);
				time_b.setSeconds(time_b.getSeconds() + 0.5);
				
				// Set variables to test callback against
				let toModify = 2;
				
				// Callback will modify the var from null to {}
				let callback_a = function(){
					toModify += 1;
				};
				let callback_b = function(){
					toModify *= 2;
				};
				let task_a = {name:'task A', st:time_a.getTime(), callback:callback_a};
				let task_b = {name:'task B', st:time_b.getTime(), callback:callback_b};
				instance.insert(task_a);
				instance.insert(task_b)
				
				setTimeout(function(){
					// Test execution
					toModify.should.equal(5);
					done(); // Wait for timeout
				},501);
			})
		})
	}
	
	static testSpecialExecutions() {
		
	}
	
	
	static run(){
		describe('Data Structure Suite',()=>{
				this.testInit();
				this.testInsertion();
				this.testExtraction();
			}
		);
		describe('Execution Suite',()=>{
			
			this.testStandardExecution();
			this.testSpecialExecutions();
		})
	}
	
}

TestSuite.run();