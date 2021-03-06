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
				(typeof instance._pop()._id).should.equal('string')
			});
			
			it('Test extracted object equality (emit id)',()=>{
				let temp = {name:'a',st:123,callback:()=>{}};
				instance.insert(temp)
				let res = instance._pop()
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
				instance._pop().name.should.equal('b')
				instance._pop().name.should.equal('c')
				instance._pop().name.should.equal('a')
			})
			it('Test size after insertion of 10 and extraction of 3',()=>{
				for(let i=0;i<10;i++){
					instance.insert({name:'a'+i,st:i,callback:()=>{}})
				}
				instance.size.should.equal(10)
				instance._pop()
				instance.size.should.equal(9)
				instance._pop()
				instance._pop()
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
	static testModification() {
		describe('Test Modification',function(){
			this.timeout(10000);
			let instance;
			beforeEach(() => {
				// Create a new Rectangle object before every test.
				instance = new JoltScheduler()
			});
			it('Simple task modification (all data but time)',()=>{
				let time = new Date();
				time.setMinutes(time.getMinutes()+1); // set 1 min cause we need time to modify
				let cb = function(){
					return 5;
				};
				let task = {name:'task', st:time.getTime(), callback:cb};
				let nodeId= instance.insert(task);
				
				let newCb = function(){
					return 1;
				};
				instance.modify(nodeId, {name:'new name'});
				instance.modify(nodeId, {callback:newCb});
				
				
				let popped = instance._pop();
				popped.name.should.equal('new name');
				popped.callback.should.equal(newCb)
				
			});
			it('Simple task time modification',(done)=>{
				let time = new Date();
				time.setMinutes(time.getMinutes()+1); // set 1 min cause we need time to modify
				
				let toModify = false;
				let cb = function(){
					toModify = true;
				};
				let task = {name:'task', st:time.getTime(), callback:cb};
				let nodeId= instance.insert(task);
				
				// Modify to immediate invocation
				instance.modify(nodeId, {st:Date.now()});
				setTimeout(function(){
					toModify.should.equal(true);
					done();
				},500)
				
			});
			it('Modify task to create race',(done)=>{
				let time_a = new Date();
				let time_b = new Date();
				time_a.setSeconds(time_a.getSeconds()+ 3);
				time_b.setSeconds(time_b.getSeconds()+ 5);
				
				let toModify = 2;
				let cb_a = function(){
					toModify += 1;
				};
				let cb_b = function(){
					toModify *= 2;
				};
				
				let task_a = {name:'task a', st:time_a.getTime(), callback:cb_a};
				let task_b = {name:'task b', st:time_b.getTime(), callback:cb_b};
				
				// insert
				instance.insert(task_a);
				let node_b_Id= instance.insert(task_b);
				
				// Modify to immediate invocation
				instance.modify(node_b_Id, {st:Date.now()});
				
				setTimeout(function(){
					toModify.should.equal(5);
					done();
				},3100)
			})
			
		})
	}
	static testDeletion() {
		describe('Test deletion',()=>{
			let instance;
			beforeEach(()=>{
				instance = new JoltScheduler();
			})
			
			it('Simple insertion and deletion',()=>{
				let time = new Date();
				time.setMinutes(time.getMinutes() + 2);
				let task={
					name:'task',
					st:time.getTime(),
					callback: function(){return;}
				};
				let id = instance.insert(task);
				instance.remove(id);
				instance.size.should.equal(0);
			});
			
			it('Attempt deletion of non-existing',(done)=>{
				try{
					instance.remove(123);
					// Should throw exception, therefor if it's here we force fail
					"a".should.equal(0);
				}catch (e){
					"a".should.equal("a");
					done();
				}
			});
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
				},1800);
			})
		})
		describe('Execution race',()=>{
			it('Insert task, then insert sooner task',function(done){
				
				// Create create delta of 0.5s
				let time_a = new Date();
				let time_b = new Date();
				time_a.setSeconds(time_a.getSeconds() + 1);
				time_b.setSeconds(time_b.getSeconds() + 0.5);
				
				// Set variable to test callback against
				let toModify = 2;
				
				// Callbacks to modify the var
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
				
				//  Since we expect execution of B and then A,
				// 	We should get 2*2+1=5.
				//  If A would of executed before B, we will get (2+1)*2=6
				setTimeout(function(){
					// Test execution
					toModify.should.equal(5);
					done(); // Wait for timeout
				},1200);
			})
			it('Insert task and negative time tasks (immediate)',function(done){
				
				// Create create delta of 0.5s
				let time_a = new Date();
				let time_b = new Date();
				let time_c = new Date();
				time_a.setSeconds(time_a.getSeconds() + 1);
				time_b.setSeconds(time_b.getSeconds() - 0.5);
				time_c.setSeconds(time_c.getSeconds() - 0.8);
				
				// Set variable to test callback against
				let toModify = 2;
				
				// Callbacks to modify the var
				let callback_a = function(){
					toModify *= 3;
				};
				let callback_b = function(){
					toModify += 1;
				};
				let callback_c = function(){
					toModify +=1
				};
				let task_a = {name:'task A', st:time_a.getTime(), callback:callback_a};
				let task_b = {name:'task B', st:time_b.getTime(), callback:callback_b};
				let task_c = {name:'task C', st:time_c.getTime(), callback:callback_c};
				instance.insert(task_a);
				instance.insert(task_b);
				instance.insert(task_c);
				
				//  Since we expect execution of B and C (no order) and then A,
				// 	We should get (2+1+1)*3=12.
				//  If A would of executed before B or C, we will get (2+1)*2=10
				setTimeout(function(){
					// Test execution
					toModify.should.equal(12);
					done(); // Wait for timeout
				},1001);
			})
		})
	}
	
	
	static run(){
		describe('Data Structure Suite',()=>{
				this.testInit();
				this.testInsertion();
				this.testExtraction();
				this.testDeletion();
				this.testModification();
			}
		);
		describe('Execution Suite',()=>{
			this.testStandardExecution();
		})
	}
	
}

TestSuite.run();