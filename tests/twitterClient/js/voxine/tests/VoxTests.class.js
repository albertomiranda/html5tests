/**
 * Framework Tests.
 * This is a tests hub where all available tests are published to public
 * interface to be used. 
 * 
 * @author Alberto Miranda <alberto@nextive.com>
 * @author Esteban Abait <esteban.abait@nextive.com>
 */
define(
    [
        'voxine/tests/VoxViewTest.class',
        'voxine/tests/VoxMediatorTest.class',
        'voxine/tests/VoxObjectTest.class'
    ],
    function(
        VoxViewTest,
        VoxMediatorTest,
        VoxObjectTest
    ) {
        return  {
            View: VoxViewTest,
            Mediator: VoxMediatorTest,
            Object: VoxObjectTest
        };
    }
);