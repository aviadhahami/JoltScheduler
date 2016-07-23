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
		
		it('Standard task insertion and execution',function(done){
			
			// Create delay of 3 sec
			let time = new Date();
			time.setSeconds(time.getSeconds() + 3);
			
			// Set variable to test callback against
			let toModify = null;
			
			// Callback will modify the var from null to {}
			let callback = function(){
				toModify = "1";
				console.log('modified!');
			};
			let task = {name:'task', st:time.getTime(), callback:callback};
			instance.insert(task);
			
			// Test execution
			"1".should.equal(toModify)
			done() // Wait for timeout
		})
	}
	
	static testSpecialExecutions() {
		
	}
	
	
	static run(){
		describe('Test Data Structure',()=>{
				this.testInit();
				this.testInsertion();
				this.testExtraction();
			}
		);
		describe('Test Execution',()=>{
			
			this.testStandardExecution();
			this.testSpecialExecutions();
		})
	}
	
}

TestSuite.run();